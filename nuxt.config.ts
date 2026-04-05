// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vite-pwa/nuxt'
  ],
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY || ''
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'SmartSpend',
      short_name: 'SmartSpend',
      description: 'Gestor de Gastos y Asesor Financiero IA',
      theme_color: '#4f46e5',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          src: 'icon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      type: 'module',
    }
  }
})
