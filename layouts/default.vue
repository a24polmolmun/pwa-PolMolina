<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 font-sans relative pb-20 sm:pb-0">
    <header class="bg-indigo-600 text-white shadow-md p-4 sticky top-0 z-10 flex items-center justify-center">
      <div class="max-w-4xl mx-auto flex items-center gap-2 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 class="text-xl font-bold tracking-tight">SmartSpend</h1>
      </div>
    </header>
    
    <main class="max-w-4xl mx-auto p-4 md:p-6 w-full">
      <slot />
    </main>

    <!-- Placeholder for Chatbot widget -->
    <ClientOnly>
      <!-- <AiWidget /> -->
    </ClientOnly>
  </div>
</template>
