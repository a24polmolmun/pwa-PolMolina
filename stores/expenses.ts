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
  
  // Hidratar desde localStorage sólo en el cliente para prevenir SSR mismatches
  if (import.meta.client) {
    const saved = localStorage.getItem('smartspend_expenses')
    if (saved) {
      try {
        expenses.value = JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse localStorage data', e)
      }
    }
    isLoaded.value = true

    // Observar cambios profundamente y guardarlos de forma reactiva
    watch(expenses, (newVal) => {
      localStorage.setItem('smartspend_expenses', JSON.stringify(newVal))
    }, { deep: true })
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

  // Acción: Exportar a JSON (Lo prepararemos aquí para usarlo en la siguiente fase)
  const exportData = (): string => {
    return JSON.stringify(expenses.value, null, 2)
  }

  return {
    expenses,
    isLoaded,
    addExpense,
    removeExpense,
    exportData
  }
})
