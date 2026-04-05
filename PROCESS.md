# Registro del proceso de desarrollo con IA (PROCESS.md)
**Alumno:** Pol Molina Muñoz
**Proyecto:** SmartSpend (PWA AI-Driven)

## Fase 1: Configuración y Especificación
**Fecha:** Dia 1

### 1. Problemas técnicos iniciales
Al empezar el proyecto tuve problemas con las variables de entorno de Windows (PATH) al instalar `uv`. Lo solucioné ejecutando la herramienta Specify mediante su ruta absoluta para inicializar el proyecto correctamente.

### 2. Prompts utilizados hoy
Para definir las reglas del proyecto, utilicé el siguiente comando con Antigravity:
/speckit.constitution Eres el Tech Lead de este proyecto. Crea una constitución para una PWA (Progressive Web App). Prioriza código limpio, modular y estándares de Vue 3 (Nuxt). Todo el backend debe estar orientado a funciones Serverless ligeras. Exige un manejo estricto de errores, especialmente en las integraciones con la API de IA para el chatbot.

Para definir la idea de la aplicación, utilicé:
/speckit.specify Quiero construir "SmartSpend", una aplicación de gestión de gastos personales.  Usuarios: Perfil único local por ahora. Funcionalidades: El usuario puede añadir gastos (cantidad, categoría, fecha) y ver un listado. Chatbot: Habrá una ventana de chat flotante integrada. El usuario le podrá preguntar cosas como "¿He gastado mucho en comida?" y el chatbot actuará como un asesor financiero analizando sus gastos. Importante: No uses tecnologías concretas en esta descripción, solo céntrate en el comportamiento y en que debe ser una PWA instalable.

---

## Fase 2: Clarificación y Planificación Técnica
**Fecha:** Día 2 (Revisión de arquitectura)

### 1. Reorganización de archivos (Control del Agente)
El agente de IA generó inicialmente los archivos de especificación en la raíz del proyecto. Como Tech Lead, tuve que intervenir para reestructurar las carpetas manualmente según el estándar estricto de Spec Kit, moviendo la constitución a `.specify/memory/` y la especificación a `.specify/specs/001-smartspend/spec.md`.

### 2. Fase de Clarificación (/speckit.clarify)
El agente analizó la especificación y detectó posibles vacíos lógicos (riesgo de pérdida de datos en caché, consumo excesivo de la API de IA y límites de funcionalidad). Le guié tomando decisiones arquitectónicas con este prompt:

 "Aquí tienes las respuestas para cerrar la fase de clarificación:
 1. Gestión de Datos: Añadiremos una opción sencilla de 'Importar/Exportar JSON' para que el usuario no pierda sus datos locales.
 2. Rol del Chatbot: Será solo de lectura (Read-Only). Analizará los gastos existentes pero no creará registros nuevos por ahora.
 3. Categorías y Detalles: Usaremos una lista fija de categorías (Comida, Ocio, Transporte, Vivienda, Salud, Otros) y añadiremos un campo opcional de 'Concepto'.
 4. Análisis IA: El chatbot solo analizará los datos de los últimos 30 días para ahorrar recursos y ser más rápido.
 
 Con esto, actualiza el archivo `spec.md` y procede a ejecutar el comando `/speckit.plan`. Recuerda que usaremos Nuxt 3, el módulo Vite PWA, Pinia para el estado y Nitro para las funciones Serverless."

 ---

 ## Fase 3: Aprobación del Plan Técnico y Stack
**Fecha:** Día 3

### 1. Definición de Tecnologías
Tras revisar la propuesta del agente, hemos tomado decisiones clave para asegurar la viabilidad del MVP:
- **Framework:** Nuxt 3 (Vue 3 + TypeScript).
- **Estilos:** Tailwind CSS (para facilitar la integración de UI generativa).
- **Estado:** Pinia con persistencia en LocalStorage (Offline-first).
- **IA:** OpenAI (GPT-4o-mini) mediante endpoints de Nitro Serverless.

---

## Fase 4: Desglose de tareas y preparación de entorno
**Fecha:** Día 4

### 1. Generación del Roadmap
He ejecutado el comando `/speckit.tasks`, lo que ha generado una lista de 7 fases de implementación en `tasks.md`. He auditado la lista para asegurar que el chatbot y la lógica de PWA están integrados desde el principio.

### 2. Control de Versiones
He realizado un commit de seguridad con toda la documentación técnica (`spec.md`, `plan.md`, `tasks.md`) antes de iniciar la generación de código fuente para tener un punto de restauración claro.

---

## Fase 5: Implementación del Core y Resolución de Conflictos
**Fecha:** Día 5

### 1. Inicialización del Entorno Nuxt 3
He procedido con la ejecución de `/speckit.implement`. Durante el proceso, surgieron dos bloqueos críticos que requirieron intervención manual como Tech Lead:

- **Conflicto de Ciclo de Vida:** El agente intentó ejecutar `nuxt prepare` con módulos (Tailwind, Pinia, PWA) declarados en el `nuxt.config.ts` antes de que `npm install` terminara de descargarlos. 
- **Solución Aplicada:** Autoricé una estrategia de "limpieza y re-activación". El agente comentó temporalmente los módulos, forzó la instalación de dependencias y los reactivó una vez el entorno era estable.

### 2. Estado de la Aplicación
Tras solucionar los errores de dependencias, la Fase 1 y Fase 2 del `tasks.md` se han completado con éxito:
- **Estructura:** Scaffolding de carpetas completado (`pages/`, `components/`, `server/`, `stores/`).
- **UI Base:** Integración de Tailwind CSS verificada.
- **Estado Global:** Store de Pinia configurado para la gestión reactiva de gastos con persistencia en LocalStorage.

### 3. Control de Versiones
He realizado un commit tras la estabilización del entorno para asegurar que la base del código fuente sea sólida antes de empezar con la lógica del Chatbot IA.

### 4. Verificación del MVP Inicial
He verificado el despliegue local en `http://localhost:3000/`. El servidor de desarrollo de Nuxt (Nitro) responde correctamente, Tailwind CSS está inyectado y la estructura de layouts/pages es consistente con la especificación técnica. Procedo a dar luz verde para la lógica de estado.