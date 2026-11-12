# capacitados.ar — Prototipo de Interfaz de Usuario (Tierra del Fuego)

Plataforma web de formación técnica, oficios e industria fueguina orientada a capacitar laboralmente a la comunidad de Río Grande, Ushuaia y Tolhuin.

- **Repositorio**: [https://github.com/nazareno28210/InterfazDeUsuarioTp](https://github.com/nazareno28210/InterfazDeUsuarioTp)
- **Demo en vivo (GitHub Pages)**: [https://nazareno28210.github.io/InterfazDeUsuarioTp/](https://nazareno28210.github.io/InterfazDeUsuarioTp/)

---

## 1. Resumen del Prototipo

El prototipo implementa una experiencia integral de usuario para el descubrimiento, exploración, detalle e inscripción a cursos de formación profesional y técnica en Tierra del Fuego. Cuenta con una arquitectura desacoplada donde el punto de acceso principal es `index.html` en la raíz y todas las pantallas secundarias residen dentro de la carpeta `/pages/`.

### Estructura de Pantallas y Carpetas
```text
├── index.html                   # Pantalla 1: Inicio / Landing Page Principal
├── app.js                       # Controlador de interactividad, enrutamiento y estado
├── README.md                    # Documentación del proyecto
├── css/
│   └── main.css                 # Estilos globales y utilitarios
├── assets/ & images/            # Recursos gráficos, logotipos e iconografía SVG
└── pages/
    ├── explorar-cursos.html     # Pantalla 2: Explorador de cursos y filtros
    ├── academias.html           # Pantalla 3: Directorio de academias adheridas
    ├── academia-mirgor.html     # Pantalla 4: Perfil institucional (Fundación Mirgor)
    ├── detalle-curso.html       # Pantalla 5: Ficha técnica y programa del curso
    ├── checkout-paso-1.html     # Pantalla 6: Wizard Checkout - Datos personales
    ├── checkout-paso-2.html     # Pantalla 7: Wizard Checkout - Método de pago
    ├── checkout-paso-3.html     # Pantalla 8: Wizard Checkout - Revisión y confirmación
    ├── confirmacion.html        # Pantalla 9: Confirmación de inscripción exitosa
    └── cancelacion.html         # Pantalla 10: Modal / Salida segura de cancelación
```

---

## 2. ¿Qué es lo que cumple el prototipo?

- **10 Pantallas conectadas y navegables**: Enlaces bidireccionales fluidos entre navegación de cabecera, botones de acción, tarjetas de catálogo, ficha de curso, flujo de compra y confirmación.
- **Barra de navegación global de prueba (`proto-dock`)**: Dock fijo inferior presente en todas las páginas que permite saltar directamente a cualquiera de las 10 pantallas para agilizar la evaluación de usabilidad.
- **Diseño responsive adaptativo (Mobile a Desktop)**: Optimizado para pantallas móviles (320px - 480px), tablets (768px - 900px) y monitores de escritorio (1024px - 1440px).
- **Menú hamburguesa responsive**: En resoluciones de pantalla reducidas (<= 900px), el encabezado colapsa automáticamente en un menú móvil accesible que soporta cierre por clic exterior y tecla `Escape`.
- **Filtros interactivos de catálogo con exclusión mutua**: En `explorar-cursos.html`, la selección de rubros funciona de manera exclusiva (evitando selecciones contradictorias), permitiendo alternar entre el catálogo general y el catálogo especializado de *Gastronomía Argentina* con actualización reactiva del contador de capacitaciones activas, chips de filtro y breadcrumbs.
- **Select dropdown estilizado**: Lista desplegable personalizada (`custom-select`) que reemplaza los selectores nativos por un diseño consistente y acorde a la identidad visual.
- **Acordeón interactivo del programa**: En `detalle-curso.html`, los módulos del temario se despliegan y contraen al hacer clic.
- **Checkout optimizado y amigable**:
  - Wizard de 3 pasos con tipografías y proporciones calibradas para una lectura cómoda.
  - Supresión de precios promocionales llamativos en favor de precios fijos transparentes.
  - Casilla funcional para aplicar cupón de descuento.
  - Pestañas interactivas de métodos de pago (Tarjeta de Crédito/Débito, Mercado Pago y Transferencia Bancaria).
- **Heurísticas de usabilidad de Nielsen aplicadas**:
  - *Heurística #1 (Visibilidad del estado del sistema)*: Breadcrumbs contextuales, contador dinámico de resultados y barra de progreso paso a paso en el checkout.
  - *Heurística #3 (Control y libertad del usuario)*: Diálogo modal de cancelación y botón de salida segura que previene pérdidas accidentales de datos en el checkout.
  - *Heurística #4 (Consistencia y estándares)*: Homogeneidad visual de botones, tipografías (Plus Jakarta Sans, Bricolage Grotesque) y paleta institucional fueguina.

---

## 3. ¿Qué es lo que NO cumple (Limitaciones del prototipo)?

- **Sin Backend ni Base de Datos**: No se conecta a una API REST, base de datos relacional ni almacén de persistencia remota. El estado vive exclusivamente en el DOM del navegador y en parámetros de URL.
- **Sin pasarela de pagos real**: El proceso de cobro en tarjeta, Mercado Pago o transferencia bancaria es una simulación visual orientada a pruebas de interfaz; no realiza cargos monetarios reales ni valida tarjetas con entidades financieras.
- **Sin autenticación de usuarios real**: Las opciones de "Iniciar Sesión" y "Registrarse" son elementos visuales de maquetación representativos para el flujo de interfaz, sin manejo de sesiones, JWT ni contraseñas.
- **Sin persistencia entre recargas**: Si se recarga la página, los textos ingresados en los campos de prueba se restablecen a sus valores iniciales.

---

## 4. ¿Qué es lo mínimo e indispensable para su funcionamiento?

Para ejecutar y probar la aplicación solo se requiere:

1. **Un navegador web moderno**: Google Chrome, Mozilla Firefox, Microsoft Edge o Apple Safari con soporte para HTML5, CSS3 (Grid y Flexbox) y JavaScript estándar (ES6).
2. **Un servidor estático local o remoto**:
   - En local: Extensión *Live Server* de VS Code, `npx serve .` o `python -m http.server 8000`.
   - En producción: GitHub Pages (soporte directo sin necesidad de pasos de compilación ni `npm build`).
3. **Estructura estática de archivos**:
   - `index.html` en la raíz.
   - Carpeta `/pages/` con los 9 archivos HTML complementarios.
   - Archivo `app.js` en la raíz.
   - Carpeta `/css/` con la hoja de estilos `main.css`.
   - Carpetas `/assets/` e `/images/` con los recursos multimedia.

---

## 5. ¿Qué hace `app.js`?

El archivo `app.js` actúa como el motor cliente de la aplicación, proporcionando:

1. **Enrutador relativo contextual (`resolveRoute`)**: Detecta automáticamente si la página actual se ejecuta desde la raíz o dentro del subdirectorio `/pages/`, resolviendo dinámicamente las rutas relativas para garantizar que ningún hipervínculo ni redirección se rompa.
2. **Inyección y control del menú móvil**: Genera dinámicamente el botón hamburguesa en pantallas pequeñas y administra el ciclo de vida del menú (apertura, cierre por clic afuera y cierre por tecla `Escape`).
3. **Enrutamiento declarativo por texto y atributos**: Asocia eventos de clic a botones, enlaces del header, tarjetas de categorías del home y banners hacia sus pantallas de destino correspondientes.
4. **Manejo del Modal de Cancelación de Checkout**: Controla la visualización del modal de confirmación antes de abandonar una compra en curso, permitiendo volver a la edición o regresar con seguridad al detalle del curso.
5. **Simulación de entradas editables**: Convierte cajas de texto simuladas en campos editables (`contenteditable`) con soporte para tecla `Enter` para pruebas de búsqueda.
6. **Módulo de filtrado reactivo de catálogo**:
   - Conmuta entre el catálogo general de 380 cursos y el catálogo filtrado de Gastronomía Argentina.
   - Garantiza la exclusión mutua de selección de rubros.
   - Refluye la grilla visual de tarjetas (`reflowGridCards`).
   - Sincroniza el contador de resultados activos, los chips removibles y la barra de búsqueda.
   - Lee el parámetro de consulta `?filtro=gastronomia` para inicializar el estado cuando se accede desde la página de inicio.
7. **Componente de Select Personalizado**: Intercepta los controles de ordenamiento, mostrando un menú desplegable accesible y estilizado con selección activa y cierre automático al hacer clic en el exterior.
8. **Acordeón temático**: Gestiona la apertura y colapso de las lecciones del programa de estudios en la pantalla de detalle de curso.
9. **Selector de medios de pago en Checkout**: Alterna dinámicamente entre las pestañas de Tarjeta, Mercado Pago y Transferencia bancaria en el paso 2 del proceso de compra.
