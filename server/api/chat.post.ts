import OpenAI from 'openai'

export default defineEventHandler(async (event) => {
  // Inicializamos dentro del evento para prevenir el error de "renderer" en Nitro / Nuxt al evaluar variables globales.
  const apiKey = process.env.OPENAI_API_KEY || ''
  const openai = new OpenAI({ apiKey: apiKey })
  try {
    const body = await readBody(event)
    const { prompt, contextData } = body

    if (!prompt) {
      return { 
        success: false, 
        text: 'No me has preguntado nada. ¿En qué te puedo ayudar con tus finanzas hoy?' 
      }
    }

    // Sistema de inyección de contexto (Limitamos a los gastos que el cliente decidió enviarnos)
    const systemPrompt = `
Eres SmartSpend AI, un asesor financiero personal integrado en una PWA. Eres profesional, amigable y muy conciso.
Tu papel principal es ayudar al usuario a entender sus hábitos de consumo, ofrecer resúmenes de sus transacciones y darle consejos de economía personal.

Reglas Críticas:
1. Sé muy breve en tus respuestas (evita párrafos excesivamente largos), el usuario te lee desde una pantallita de chat flotante.
2. NUNCA inventes gastos. 
3. Eres una IA pasiva (Read-Only). Explícale al usuario que no puedes añadir gastos ni borrarlos; tú solo analizas la información que te llega.
4. Responde SIEMPRE en el idioma en el que te hable el usuario (por defecto español).

A continuación tienes el HISTORIAL (JSON) de los últimos 30 días generados por el usuario:
${JSON.stringify(contextData || [])}
`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.6,
      max_tokens: 300 // Limitamos la salida para mantener las respuestas cortas y baratas
    })

    return {
      success: true,
      text: completion.choices[0]?.message?.content || 'Pido disculpas, procesé la información pero no supe qué responder.'
    }

  } catch (error: any) {
    // Graceful Degradation: Ocultamos el stack trace en el cliente
    console.error('AI API Gateway Error:', error?.message || error)
    
    return {
      success: false,
      text: 'Nuestra IA se encuentra indispuesta o hay problemas de conexión. Por favor, asegúrate de que tu servicio de red funciona de forma estable y prueba en un momento.'
    }
  }
})
