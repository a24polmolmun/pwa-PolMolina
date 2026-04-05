# SmartSpend - Documento de Especificación

## 1. Visión General del Producto
**SmartSpend** es una solución de gestión de gastos personales diseñada para ser intuitiva, portátil y fuertemente analítica. La aplicación debe existir dentro de un formato de **Aplicación Web Progresiva (PWA)**, lo que asegura que pueda instalarse directamente en el dispositivo del usuario (móvil o escritorio) proporcionando una experiencia veloz, en pantalla completa y con identidad de aplicación nativa.

## 2. Arquitectura de Usuarios
- **Perfil Autocontenido:** Actualmente la aplicación funcionará bajo un ecosistema de "Perfil único local".
- **Privacidad e Inmediatez:** Funciona sin configuraciones de cuentas, contraseñas o inicio de sesión en servidores externos. El usuario accede e interacciona con sus datos de manera directa e inmediata y todo el comportamiento vive bajo esa sesión aislada del dispositivo.
- **Respaldo de Datos:** Se incluye una opción manual sencilla para 'Importar/Exportar JSON' de manera que el usuario pueda respaldar o migrar su información local.

## 3. Comportamiento y Funcionalidades Core
### Módulo de Entradas (Ingreso de Datos)
El usuario contará con una interfaz rápida para agregar salidas de dinero. Todo movimiento financiero registrado exigirá mínimamente:
- **Cantidad:** El importe numérico gastado.
- **Categoría:** Clasificación del gasto seleccionable desde un listado fijo predefinido (Comida, Ocio, Transporte, Vivienda, Salud, Otros).
- **Fecha:** Día exacto de la salida del capital.
- **Concepto (Opcional):** Un campo de texto breve para añadir detalles adicionales sobre el gasto.

### Panel de Visualización (Listado)
- El usuario tendrá acceso a una vista a modo de registro o diario, en la que de manera clara se listarán todos los gastos históricos.
- Los listados estarán estructurados visualmente para facilitar el seguimiento (por ejemplo, mostrando de más recientes a más antiguos y agrupando visualmente las mismas categorías).

## 4. El Asistente Financiero Inteligente (Chatbot)
### Interfaz y Accesibilidad
- Existirá una **ventana de chat flotante** superpuesta a la interfaz principal. El usuario puede abrir y cerrar este módulo de chat en cualquier momento sin perder el flujo principal ni los datos no guardados que tuviese en segundo plano.

### Rol y Mecánica
- El asistente actuará como un estratega y asesor de finanzas personales altamente personalizado.
- **Conciencia del contexto y Limitaciones:** A través de un procesamiento subyacente, el asistente tiene lectura y entendimiento del listado de gastos. Para mantener agilidad de carga y eficiencia, su ventana de análisis se limitará a los registros de los **últimos 30 días**.
- **Comportamiento Pasivo (Read-Only):** El rol de la IA es interactivo pero de **solo lectura**, no cuenta con privilegios para escribir ni alterar la base de datos contable del usuario.
- El usuario utilizará lenguaje natural (ej. *"¿He gastado mucho en comida últimamente?"*, *"Resume mis gastos fuertes de esta semana"*).
- El chatbot analizará el histórico dentro de su rango visible y formulará respuestas estructuradas evaluando los índices de consumo o dando recomendaciones.

## 5. Requisitos No Funcionales (PWA Inmersiva)
- **Experiencia de App Nativa:** Al ser instalada desde el navegador al dispositivo celular/escritorio, deberá poseer su propia iconografía, pantalla de carga y prescindir absolutamente de elementos de navegación de navegador (URL bar, botones nativos de refresco).
- **Fluidez y Rapidez:** Todas las transiciones entre la vista de vista de listar gastos, agregar nuevos y la ventana del chat flotante carecerán de cargas abruptas; todo se percibirá instantáneo.
- **Autonomía:** Las mecánicas principales deben tolerar entornos inestables de la red, de forma que visualizar listados e ingresar los registros mantenga su funcionalidad robusta aunque no hubiere comunicación de red óptima intermitentemente.
