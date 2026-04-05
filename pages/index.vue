<template>
  <div class="flex flex-col gap-6">
    <section class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <h2 class="text-lg font-semibold mb-4 text-indigo-700">Agregar Gasto</h2>
      <ExpensesExpenseForm />
    </section>

    <section class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <h2 class="text-lg font-semibold mb-4 flex justify-between items-center text-indigo-700">
        <span>Historial de Gastos</span>
        <div class="flex gap-2">
          <button @click="triggerExport" class="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-md hover:bg-emerald-100 transition-colors shadow-sm">
            Exportar
          </button>
          <button @click="triggerImport" class="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition-colors shadow-sm">
            Importar
          </button>
          <input type="file" ref="fileInput" @change="handleFileUpload" accept=".json" class="hidden" />
        </div>
      </h2>
      <ExpensesExpenseList />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useExpensesStore } from '~/stores/expenses'
import { ref } from 'vue'

const store = useExpensesStore()
const fileInput = ref<HTMLInputElement | null>(null)

const triggerExport = () => {
  const jsonStr = store.exportData()
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `smartspend_backup_${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const triggerImport = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return
  
  const file = target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    const content = e.target?.result as string
    if (content) {
      const success = store.importData(content)
      if (success) {
        alert('¡Datos importados correctamente!')
      } else {
        alert('Error: Archivo JSON inválido.')
      }
    }
  }
  reader.readAsText(file)
  
  // Limpiar el input para permitir importar el mismo archivo en caso de ser necesario
  target.value = ''
}
</script>
