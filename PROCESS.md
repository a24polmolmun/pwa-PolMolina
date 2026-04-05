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