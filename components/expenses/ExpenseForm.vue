<template>
  <form @submit.prevent="submitExpense" class="flex flex-col gap-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Amount -->
      <div class="flex flex-col">
        <label for="amount" class="text-sm font-medium text-gray-700 mb-1">Cantidad ($) <span class="text-red-500">*</span></label>
        <input 
          id="amount" 
          v-model.number="form.amount" 
          type="number" 
          step="0.01" 
          min="0.01" 
          required 
          class="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="0.00"
        />
      </div>

      <!-- Category -->
      <div class="flex flex-col">
        <label for="category" class="text-sm font-medium text-gray-700 mb-1">Categoría <span class="text-red-500">*</span></label>
        <select 
          id="category" 
          v-model="form.category" 
          required 
          class="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
        >
          <option value="" disabled>Seleccionar...</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <!-- Date -->
      <div class="flex flex-col">
        <label for="date" class="text-sm font-medium text-gray-700 mb-1">Fecha <span class="text-red-500">*</span></label>
        <input 
          id="date" 
          v-model="form.date" 
          type="date" 
          required 
          class="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
        />
      </div>

      <!-- Concept -->
      <div class="flex flex-col">
        <label for="concept" class="text-sm font-medium text-gray-700 mb-1">Concepto <span class="text-gray-400 font-normal">(Opcional)</span></label>
        <input 
          id="concept" 
          v-model="form.concept" 
          type="text" 
          maxlength="50"
          placeholder="Ej: Cena con amigos"
          class="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
        />
      </div>
    </div>

    <!-- Error Message -->
    <p v-if="errorMsg" class="text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
      {{ errorMsg }}
    </p>

    <!-- Submit Action -->
    <div class="mt-2 text-right">
      <button 
        type="submit" 
        class="bg-indigo-600 text-white font-medium px-6 py-2.5 rounded-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all active:scale-95 shadow-sm"
      >
        Añadir Gasto
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useExpensesStore } from '~/stores/expenses'

const store = useExpensesStore()
const categories = ['Comida', 'Ocio', 'Transporte', 'Vivienda', 'Salud', 'Otros']
const getDefaultDate = () => new Date().toISOString().split('T')[0]

const form = ref({
  amount: null as number | null,
  category: '',
  date: getDefaultDate(),
  concept: ''
})

const errorMsg = ref('')

const submitExpense = () => {
  errorMsg.value = ''
  
  if (!form.value.amount || form.value.amount <= 0) {
    errorMsg.value = 'Por favor, ingresa una cantidad válida y mayor que cero.'
    return
  }
  if (!form.value.category) {
    errorMsg.value = 'Por favor, selecciona una categoría.'
    return
  }
  if (!form.value.date) {
    errorMsg.value = 'Por favor, asigna una fecha válida.'
    return
  }

  // Inject to store
  store.addExpense({
    amount: Number(form.value.amount),
    category: form.value.category,
    date: form.value.date,
    concept: form.value.concept.trim()
  })

  // Reset logic: amount and concept. Keep date and category for rapid sequential inputs.
  form.value.amount = null
  form.value.concept = ''
}
</script>
