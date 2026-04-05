import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface Expense {
  id: string
  amount: number
  category: string
  date: string
  concept?: string
}

export const useExpensesStore = defineStore('expenses', () => {
  const expenses = ref<Expense[]>([])
  const isLoaded = ref(false)
  
  let isWatching = false

  const loadFromStorage = () => {
    if (isLoaded.value) return

    try {
      const saved = localStorage.getItem('smartspend_expenses')
      if (saved) {
        expenses.value = JSON.parse(saved)
      }
    } catch (e) {
      console.error('Failed to parse localStorage data', e)
    } finally {
      isLoaded.value = true // Forzar siempre el fin de la carga
    }

    if (!isWatching) {
      watch(expenses, (newVal) => {
        localStorage.setItem('smartspend_expenses', JSON.stringify(newVal))
      }, { deep: true })
      isWatching = true
    }
  }

  // Acción: Añadir gasto
  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: crypto.randomUUID() // UUID nativo del navegador
    }
    // Agregamos al principio para que el historial muestre lo más reciente arriba
    expenses.value.unshift(newExpense)
  }

  // Acción: Eliminar gasto (opcional extra que pidió el usuario)
  const removeExpense = (id: string) => {
    expenses.value = expenses.value.filter(e => e.id !== id)
  }

  // Acción: Exportar a JSON
  const exportData = (): string => {
    return JSON.stringify(expenses.value, null, 2)
  }

  // Acción: Importar desde JSON
  const importData = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData)
      if (Array.isArray(parsed)) {
        // Sustituimos todo el store y delegamos el guardado al watcher activo
        expenses.value = parsed
        return true
      }
      return false
    } catch (e) {
      return false
    }
  }

  return {
    expenses,
    isLoaded,
    loadFromStorage,
    addExpense,
    removeExpense,
    exportData,
    importData
  }
})
