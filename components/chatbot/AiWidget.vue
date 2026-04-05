<template>
  <div class="font-sans">
    <!-- Botón Flotante -->
    <button 
      v-if="!isOpen" 
      @click="toggleChat(true)"
      class="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-14 h-14 bg-indigo-600 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 flex items-center justify-center text-white transition-all z-50 focus:ring-4 focus:ring-indigo-300"
      aria-label="Abrir Asesor de SmartSpend"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    </button>

    <!-- Ventana de Chat Flotante -->
    <div 
      v-else 
      class="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[90vw] md:w-[380px] h-[500px] max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-100 overflow-hidden transition-all duration-300 transform scale-100 opacity-100"
    >
      <!-- Cabecera -->
      <div class="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md z-10">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="flex flex-col">
            <h3 class="font-bold text-sm tracking-wide">SmartSpend AI</h3>
            <div class="flex items-center gap-1.5 object-contain">
              <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              <p class="text-[10px] text-indigo-100 opacity-90 uppercase tracking-widest font-semibold">Online</p>
            </div>
          </div>
        </div>
        <button @click="toggleChat(false)" class="text-indigo-100 hover:text-white p-1.5 rounded-md hover:bg-indigo-500 hover:shadow-sm transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Area de Mensajes con Scroll -->
      <div class="flex-1 p-4 overflow-y-auto bg-[#F8F9FE] flex flex-col gap-4 text-sm" ref="chatBox">
        <!-- Loop de mensajes -->
        <div 
          v-for="(msg, i) in messages" 
          :key="i"
          class="max-w-[85%] rounded-2xl p-3.5 shadow-sm flex flex-col"
          :class="msg.role === 'user' ? 'bg-indigo-600 text-white self-end rounded-br-sm' : 'bg-white text-gray-800 border border-gray-100 self-start rounded-bl-sm'"
        >
          <span class="leading-relaxed">{{ msg.text }}</span>
        </div>
        
        <!-- Indicador "La IA está escribiendo..." -->
        <div v-if="isLoading" class="bg-white border border-gray-100 shadow-sm text-gray-500 self-start rounded-2xl rounded-bl-sm p-4 max-w-[60%] flex gap-1.5">
          <span class="w-2 h-2 bg-indigo-400/80 rounded-full animate-bounce"></span>
          <span class="w-2 h-2 bg-indigo-400/80 rounded-full animate-bounce" style="animation-delay: 0.15s"></span>
          <span class="w-2 h-2 bg-indigo-400/80 rounded-full animate-bounce" style="animation-delay: 0.3s"></span>
        </div>
      </div>

      <!-- Input de Envío -->
      <form @submit.prevent="sendMessage" class="p-4 bg-white border-t border-gray-100">
        <div class="relative flex items-center">
          <input 
            v-model="inputMsg" 
            type="text" 
            placeholder="Pregúntame por tus gastos..." 
            class="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 rounded-full text-sm outline-none transition-all shadow-inner"
            :disabled="isLoading"
          />
          <button 
            type="submit" 
            :disabled="!inputMsg.trim() || isLoading"
            class="absolute right-1.5 w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 disabled:opacity-40 disabled:bg-gray-400 transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform -rotate-90 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        <p class="text-[9px] text-center text-gray-400 mt-2">Respuestas generadas por IA. Eres el maestro de tus finanzas.</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useExpensesStore } from '~/stores/expenses'

const store = useExpensesStore()

const isOpen = ref(false)
const inputMsg = ref('')
const isLoading = ref(false)
const chatBox = ref<HTMLElement | null>(null)

interface Message {
  role: 'user' | 'assistant'
  text: string
}

// Mensaje de saludo de cortesía (Local)
const messages = ref<Message[]>([
  { role: 'assistant', text: '¡Hola! Soy la IA de SmartSpend. Tengo acceso a tu listado histórico de manera ultra rápida. ¿En qué quieres que te aconseje o analice hoy?' }
])

const toggleChat = (state: boolean) => {
  isOpen.value = state
}

const scrollToBottom = async () => {
  await nextTick() // Asegura que el DOM haya re-renderizado
  if (chatBox.value) {
    chatBox.value.scrollTop = chatBox.value.scrollHeight
  }
}

const sendMessage = async () => {
  const query = inputMsg.value.trim()
  if (!query) return

  // 1. Mostrar Input Local (Usuario en azul a la derecha)
  messages.value.push({ role: 'user', text: query })
  inputMsg.value = ''
  isLoading.value = true
  scrollToBottom()

  try {
    // 2. Extraer contexto (últimos 30/50 registros en orden cronológico inverso son inyectados)
    const contextData = store.expenses.slice(0, 50) 
    
    // 3. Post HTTP Hacia server/api/chat.post.ts
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: query,
        contextData: contextData
      })
    })

    const data = await response.json()
    
    // 4. Inyectar respuesta del servidor Nitro
    messages.value.push({ role: 'assistant', text: data.text || 'Sin respuesta.' })

  } catch (error) {
    // Si la conexión Fetch crashea físicamente
    messages.value.push({
      role: 'assistant',
      text: 'Error de Red Local: No pude alcanzar tu servidor nitro local. Verifica tu conexión.'
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}
</script>
