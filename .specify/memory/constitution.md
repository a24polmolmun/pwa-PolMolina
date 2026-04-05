# Constitución de la PWA (Progressive Web App)

## 0. Filosofía y Rol (Tech Lead)
Como Tech Lead de este proyecto, establezco esta constitución como la única fuente de verdad para el desarrollo de nuestra PWA. Nuestro objetivo es crear una aplicación escalable, de alto rendimiento y resiliente. Toda decisión técnica debe alinearse con estos principios.

---

## 1. Principios Base
- **Código Limpio (Clean Code):** Prevalece la legibilidad. Si necesitas explicar qué hace el código con un comentario, refactorízalo. El código debe ser autodocumentado.
- **Modularidad:** Todo debe ser pequeñas piezas conectables. Evita los "God Objects" o componentes gigantes. Principio de Responsabilidad Única (SRP) en todos los niveles.
- **First-Class PWA:** Obligatorio soporte offline, Service Workers configurados correctamente para cacheo de assets predecible y manifiesto web impecable.

---

## 2. Estándares de Frontend (Vue 3 / Nuxt 3)
- **Patrón Base:** Uso estricto de **Nuxt 3** con **Vue 3 Composition API** y sintaxis `<script setup>`. Prohibido el Options API.
- **TypeScript:** Modo estricto activado (`strict: true`). Prohibido terminantemente el uso de `any`. Las interfaces para props, emits y respuestas de la API son obligatorias.
- **Arquitectura de Carpetas:**
  - `components/`: Componentes de presentación (Dumb components). No hacen peticiones de red.
  - `composables/`: Lógica de negocio reutilizable y conexión con estado (Smart logic).
  - `pages/`: Componentes enrutados. Deben ser lo más ligeros posible y delegar en composables y componentes.
  - `server/`: Funciones serverless manejadas por Nitro.
- **Estado:** Utilizar herramientas nativas de Vue (`ref`, `computed`) para el estado local y **Pinia** para el estado global de la aplicación.

---

## 3. Arquitectura Backend (Serverless)
- **Enfoque 100% Serverless:** Todo el backend debe estar construido basándose en funciones aisladas, sin estado y de vida corta (vía Nuxt Nitro API routes u otros proveedores de Functions/Edge).
- **Ligereza:** Las funciones Serverless no deben contener módulos pesados que afecten al cold-start. Si una tarea requiere procesamientos largos, se deberá desacoplar y usar colas/workers si el proveedor lo requiere.
- **Interconectividad:** Las funciones deben recibir y retornar un contrato estricto de datos (JSON bien tipado).

---

## 4. Integraciones y Chatbot de IA (Error Handling Crítico)
La integración con el modelo de IA es el corazón interactivo del usuario y el puente con mayor riesgo de falla (latencia, timeouts, rate-limits).
- **Manejo Estricto de Errores:**
  - Toda interacción con la API de IA debe estar bajo un bloque `try/catch` riguroso.
  - **Graceful Degradation:** La caída de la API de IA o un error 500 no debe romper la PWA. Deben existir mensajes de fallback amigables para el usuario (ej. *"Nuestra IA está descansando un momento, intenta de nuevo"*).
  - **Prohibido exponer stack traces:** Ningún error en bruto proveniente de OpenAI/Anthropic/LLM debe llegar a la interfaz visual ni al log del cliente.
- **Resiliencia y UX:**
  - Implementación obligatoria de **Timeouts** predefinidos en el fetch hacia la IA. No podemos dejar al usuario en un estado de carga "infinito".
  - Se debe implementar **Retry Patterns** (con Exponential Backoff) para mitigar fallas temporales (como excesos de cuota o caídas abruptas).
  - Uso de **SSE (Server-Sent Events) / Streaming** si los tiempos de respuesta de la IA superan 1.5 - 2 segundos, para mostrar "escribiendo..." y mantener la atención del usuario.

---

## 5. Calidad y Pipeline
- **Linting & Formatting:** ESLint (fijado para Vue 3 / Nuxt 3) y Prettier autoconfigurados pre-commit. No se aceptan PRs con warnings de TypeScript.
- **Testing:** Obligatorio hacer unit test para los `composables` (lógica de negocio pura) y para las integraciones de endpoints Serverless que gestionan los payloads de la IA.
