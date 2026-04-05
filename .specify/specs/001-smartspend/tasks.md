# Lista de Tareas (SmartSpend PWA)

- [x] **Fase 1: Configuración Inicial**
  - [x] Generar el nuevo proyecto de Nuxt 3 (`npx nuxi@latest init`).
  - [x] Instalar e inicializar Tailwind CSS (`@nuxtjs/tailwindcss`).
  - [x] Añadir módulos clave (`@pinia/nuxt`, `@vite-pwa/nuxt`).
  - [x] Limpiar código por defecto e inicializar directorio de carpetas.

- [x] **Fase 2: Arquitectura de Estado Local (Capa Lógica)**
  - [x] Crear el "Store" principal de Pinia en `stores/expenses.ts`.
  - [x] Implementar la hidratación / guardado reactivo al `localStorage`.
  - [x] Implementar Actions para agregar gastos.

- [x] **Fase 3: Desarrollo de UI - Gestión de Gastos**
  - [x] Códificar Componente `ExpenseForm.vue` (manejo de inputs y submit seguro).
  - [x] Códificar Componente `ExpenseList.vue` (renderizado de arrays con Tailwind).
  - [x] Unir los componentes en la página principal (`pages/index.vue`).

- [x] **Fase 4: Importación y Exportación JSON**
  - [x] Añadir lógica Action en la Store y Botones UI en el Dashboard para descargar/subir el estado local en `.json`.

- [x] **Fase 5: Módulo del Asesor IA (Nitro + OpenAI)**
  - [x] Instalar paquete oficial/fetcher para requerir `api.openai`.
  - [x] Crear el endpoint seguro en `server/api/chat.post.ts`.
  - [x] Definir el *System Prompt* y establecer manejo de errores/timeouts (`try/catch`).

- [ ] **Fase 6: Chatbot Widget (Frontend UI)**
  - [ ] Crear el componente `AiWidget.vue` (Floating Action Button).
  - [ ] Diseñar el historial de chat con *Tailwind CSS*.
  - [ ] Integrar el consumo hacia `/api/advisor.post` y simular la visualización de "pensando...".

- [ ] **Fase 7: PWA Manifesto & Polish**
  - [ ] Ajustar el archivo `nuxt.config.ts` verificando Service Workers e iconografía.
  - [ ] Testear resiliencia de la interfaz instalable.
