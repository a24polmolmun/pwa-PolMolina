# Registro del proceso de desarrollo con IA (PROCESS.md)
**Alumno:** Pol Molina Muñoz
**Proyecto:** SmartSpend (PWA AI-Driven)

## Fase 1: Configuración y Especificación
**Fecha:** 

### 1. Problemas técnicos iniciales
Al empezar el proyecto tuve problemas con las variables de entorno de Windows (PATH) al instalar `uv`. Lo solucioné ejecutando la herramienta Specify mediante su ruta absoluta para inicializar el proyecto correctamente.

### 2. Prompts utilizados hoy
Para definir las reglas del proyecto, utilicé el siguiente comando con Antigravity:
/speckit.constitution Eres el Tech Lead de este proyecto. Crea una constitución para una PWA (Progressive Web App). Prioriza código limpio, modular y estándares de Vue 3 (Nuxt). Todo el backend debe estar orientado a funciones Serverless ligeras. Exige un manejo estricto de errores, especialmente en las integraciones con la API de IA para el chatbot.

Para definir la idea de la aplicación, utilicé:
/speckit.specify Quiero construir "SmartSpend", una aplicación de gestión de gastos personales.  Usuarios: Perfil único local por ahora. Funcionalidades: El usuario puede añadir gastos (cantidad, categoría, fecha) y ver un listado. Chatbot: Habrá una ventana de chat flotante integrada. El usuario le podrá preguntar cosas como "¿He gastado mucho en comida?" y el chatbot actuará como un asesor financiero analizando sus gastos. Importante: No uses tecnologías concretas en esta descripción, solo céntrate en el comportamiento y en que debe ser una PWA instalable.