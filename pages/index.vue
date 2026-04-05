<template>
  <div class="flex flex-col gap-6">
    <section class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <h2 class="text-lg font-semibold mb-4 text-indigo-700">Agregar Gasto</h2>
      <ExpensesExpenseForm />
    </section>

    <section class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <h2 class="text-lg font-semibold mb-4 flex justify-between items-center text-indigo-700">
        <span>Historial de Gastos</span>
        <button class="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md hover:bg-indigo-100 transition-colors">Importar/Exportar</button>
      </h2>
      <ExpensesExpenseList />
    </section>
  </div>
</template>
