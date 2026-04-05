# Plan Técnico - SmartSpend

## 1. Stack Tecnológico Base
- **Frontend Framework:** Nuxt 3 (Vue 3, TypeScript, Composition API estricta).
- **Estilos y UI:** Tailwind CSS (garantizando prototipado rápido y diseño responsivo robusto).
- **Manejo de Estado:** Pinia (Core State) con persistencia en `localStorage` del cliente.
- **PWA Capabilities:** Módulo `@vite-pwa/nuxt` (Service Workers, CacheFirst, Manifest.json).
- **Backend de API:** Nuxt Nitro (rutas API Serverless integradas).
- **Proveedor IA:** OpenAI (Modelo: `gpt-4o-mini`).

## 2. Arquitectura de Datos (Pinia Store)
**`stores/expenses.ts`**
- **Modelo:** `Expense { id: string, amount: number, category: string, date: string, concept?: string }`
- **Persistencia:** Sync automático hacia `localStorage` al mutar el estado, garantizando Inmediatez (Offline-First).
- **Acciones:**
  - Agregar nuevo gasto.
  - Generar exportación JSON completa.
  - Ingestar (Importar) archivo JSON validando la estructura.
- **Getters:** Obtener histórico general, y obtener recorte estricto de los últimos 30 días para enviar como contexto a la IA.

## 3. Disposición Estructural (Componentes)
- `layouts/default.vue`: Estructura base (Mobile-First) que contiene el slot principal y el Chatbot como Fixed Floating Button.
- `pages/index.vue`: El Dashboard.
- `components/expenses/ExpenseForm.vue`: Formulario tipado para registros.
- `components/expenses/ExpenseList.vue`: Rendering cronológico de gastos previos.
- `components/chatbot/AiWidget.vue`: Componente aislado del asistente.

## 4. Backend Edge/Serverless (Nitro)
**`server/api/advisor.post.ts`**
- Endpoint que ofusca las credenciales (`process.env.OPENAI_API_KEY`).
- Recibe `{ prompt, past30DaysContext }`.
- System Prompt inyectado indicando a `gpt-4o-mini` comportarse como un analista financiero preciso de "Read-Only".
- Try/Catch estricto: En caso de timeout de OpenAI, devolverá un mensaje de gracia sin colapsar el frontend.
