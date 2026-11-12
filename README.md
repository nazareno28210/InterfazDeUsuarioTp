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

---

## 3. Las 3 Heurísticas de Nielsen que Mejor Cumple el Prototipo

El prototipo fue concebido y refinado aplicando los principios clásicos de usabilidad de Jakob Nielsen, destacándose con especial énfasis en tres de ellos:

### 1. Heurística #1: Visibilidad del Estado del Sistema (*Visibility of System Status*)
El sistema mantiene informado al usuario en todo momento sobre qué está ocurriendo mediante retroalimentación oportuna y visible:
- **Catálogo reactivo y breadcrumbs**: En `explorar-cursos.html`, el usuario siempre sabe exactamente cuántas opciones coinciden con su filtro mediante un contador dinámico en tiempo real (*"380 capacitaciones activas"* vs *"24 capacitaciones activas en Gastronomía Argentina"*), complementado por migas de pan jerárquicas que muestran la ubicación exacta.
- **Wizard de Checkout con barra de progreso**: Durante la compra, el flujo de 3 pasos exhibe claramente la fase actual (*1. Datos del Alumno* → *2. Medio de Pago* → *3. Confirmación*), indicando qué pasos ya fueron superados y cuánto resta para concluir la inscripción.
- **Feedback de interacción**: En `detalle-curso.html`, el acordeón del programa rota suavemente el chevron indicador y resalta el número de módulo activo para confirmar visualmente el estado abierto o colapsado.

### 2. Heurística #3: Control y Libertad del Usuario (*User Control and Freedom*)
El diseño ofrece "salidas de emergencia" directas y claras en caso de que el usuario cometa un error o decida rectificar sus decisiones:
- **Salida segura y prevención de abandono involuntario**: En cualquier punto del checkout, el enlace *"Cancelar y volver al curso"* no aborta destructivamente la operación, sino que dispara un diálogo modal de confirmación donde el usuario puede retomar la carga o confirmar la salida segura de vuelta a la ficha del curso.
- **Rectificación y navegación bidireccional**: En el paso final de revisión (paso 3), se incorporan botones explícitos de corrección (*"Modificar datos"*, *"Modificar pago"*), permitiendo regresar a pasos previos sin forzar al usuario a empezar el formulario desde cero.
- **Reversibilidad de filtros**: En el catálogo se provee el botón *"Limpiar filtros"* y chips desmontables con la cruz *"×"* para restablecer el catálogo al estado inicial con un solo clic.

### 3. Heurística #4: Consistencia y Estándares (*Consistency and Standards*)
La interfaz respeta rigurosamente las convenciones establecidas del diseño web moderno y plataformas formativas:
- **Convenciones de navegación y catálogo**: Disposición estándar de barra de búsqueda superior, filtros facetados a la izquierda y grilla de tarjetas con atributos clave (modalidad, duración, institución y precio), facilitando que el usuario aplique conocimientos previos adquiridos en otros sitios sin curva de aprendizaje.
- **Precios fijos y transparentes**: Se eliminaron los tachados y promociones engañosas para mostrar aranceles netos fijos y uniformes, transmitiendo seriedad institucional y evitando confusión sobre el costo final de la formación.
- **Sistema visual y tipográfico homogéneo**: Empleo consistente de tipografías legibles (*Plus Jakarta Sans* y *Bricolage Grotesque*), coherencia en la jerarquía de botones de acción (primarios en verde bosque `#173b32`, secundarios en pasteles menta) e iconografía estandarizada en todas las páginas.

---

## 4. ¿Qué es lo que NO cumple (Limitaciones del prototipo)?

- **Sin Backend ni Base de Datos**: No se conecta a una API REST, base de datos relacional ni almacén de persistencia remota. El estado vive exclusivamente en el DOM del navegador y en parámetros de URL.
- **Sin pasarela de pagos real**: El proceso de cobro en tarjeta, Mercado Pago o transferencia bancaria es una simulación visual orientada a pruebas de interfaz; no realiza cargos monetarios reales ni valida tarjetas con entidades financieras.
- **Sin autenticación de usuarios real**: Las opciones de "Iniciar Sesión" y "Registrarse" son elementos visuales de maquetación representativos para el flujo de interfaz, sin manejo de sesiones, JWT ni contraseñas.
- **Sin persistencia entre recargas**: Si se recarga la página, los textos ingresados en los campos de prueba se restablecen a sus valores iniciales.

---

## 5. ¿Qué es lo mínimo e indispensable para su funcionamiento?

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

## 6. ¿Qué hace `app.js`?

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
