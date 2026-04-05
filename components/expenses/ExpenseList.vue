<template>
  <div class="flex flex-col">
    <!-- Esqueleto mientras el LocalStorage carga en el cliente -->
    <div v-if="!store.isLoaded" class="flex justify-center p-8 text-gray-400">
      <svg class="animate-spin h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- Empty state -->
    <div v-else-if="store.expenses.length === 0" class="flex flex-col items-center justify-center p-10 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
      <div class="text-indigo-200 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
      <p class="text-gray-500 font-medium">Aún no hay gastos registrados</p>
      <p class="text-sm text-gray-400 mt-1">Añade uno desde el formulario superior</p>
    </div>

    <!-- Mapeo de la lista -->
    <ul v-else class="flex flex-col divide-y divide-gray-100">
      <li 
        v-for="exp in store.expenses" 
        :key="exp.id" 
        class="py-4 hover:bg-gray-50 p-2 -mx-2 px-4 rounded-lg transition-colors flex justify-between items-center group cursor-default"
      >
        <div class="flex items-center gap-4 border-l-4 pl-3" :class="getColorBorder(exp.category)">
          <div class="flex flex-col gap-0.5">
            <span class="font-semibold text-gray-800 flex items-center gap-1.5 flex-wrap">
              {{ exp.concept || exp.category }}
              <span v-if="exp.concept" class="text-[10px] font-medium px-2 py-0.5 bg-gray-100 uppercase tracking-wider text-gray-600 rounded-sm">{{ exp.category }}</span>
            </span>
            <span class="text-xs text-gray-400">{{ formatDate(exp.date) }}</span>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
          <span class="font-bold text-gray-900 tracking-tight">${{ exp.amount.toFixed(2) }}</span>
          <button 
            @click="store.removeExpense(exp.id)" 
            title="Eliminar gasto"
            class="text-gray-300 hover:text-red-500 transition-colors sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 p-1.5 rounded-full hover:bg-red-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useExpensesStore } from '~/stores/expenses'
import { onMounted } from 'vue'

const store = useExpensesStore()

onMounted(() => {
  store.loadFromStorage()
})

const formatDate = (dateStr: string) => {
  // Ajuste para evitar bugs de zona horaria si usamos '2025-01-01'
  const date = new Date(dateStr + 'T00:00:00')
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' }
  return date.toLocaleDateString('es-ES', options)
}

const getColorBorder = (category: string) => {
  switch (category) {
    case 'Comida': return 'border-orange-400'
    case 'Ocio': return 'border-pink-400'
    case 'Transporte': return 'border-blue-400'
    case 'Vivienda': return 'border-emerald-400'
    case 'Salud': return 'border-red-400'
    case 'Otros': return 'border-gray-400'
    default: return 'border-indigo-400'
  }
}
</script>
