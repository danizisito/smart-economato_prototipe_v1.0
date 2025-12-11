# Smart Economato v1.0 – Daniel Rodríguez Hernández

## ¿Qué es?

Smart Economato es una mini aplicación web para gestionar inventario. Está hecha solo con **JavaScript moderno**, sin frameworks pesados, para que cargue rápido y sea fácil de mantener.

La idea es digitalizar el control de stock y hacer más cómodo el proceso de recibir mercancía.

## Qué puede hacer

### Funciones principales
* **Gestionar productos:** Verlos en una tabla interactiva creada con la librería Grid.js, donde puedes buscar y cambiar de página.
* **Añadir productos:** Formulario simple para crear nuevos artículos.
* **Recepción rápida:** Una pantalla pensada para **escanear códigos de barras** y actualizar cantidades al momento.
* **Navegación fluida:** Funciona como una SPA (Single Page Application), así que el router carga solo lo necesario y la página no se recarga completa.


### Seguridad
* **Control de acceso:** Solo puedes entrar a las partes protegidas si tu sesión está activa (usando `sessionStorage`).

No es ultra-seguro, pero cumple para un prototipo.

## Cómo está organizado el proyecto

El proyecto está dividido por partes para tenerlo todo ordenado y fácil de mantener.

### Arquitectura por Capas
| Capa | Archivos | Qué hacen |
| :--- | :--- | :--- |
| **Controladores** | `almacenController.js`, `recepcionController.js` | Conectan la lógica con la pantalla. Escuchan clics, eventos, etc. |
| **Servicios** | `economatoService.js`, `authServices.js` | Hablan con la “API” (simulada). Piden y envían datos. |
| **Vistas/UI** | `economato-ui.js`, `login-ui.js` | Editan lo que se ve en pantalla: tablas, textos, formularios… |
| **Utilidades** | `authGuard.js`, `main.js` | Extras como proteger rutas o manejar el menú principal. |

### Diseño para tablets y móviles
* Hay un **menú hamburguesa** que aparece en pantallas pequeñas.
* Eso deja más espacio libre para la tabla y mejora la experiencia en móviles/tablets.

---

## Puntos Fuertes del proyecto

### Manejo de errores 
* Mensajes visuales (éxito/error).
* El servicio (`economatoService.js`) controla errores de conexión para que la app no meta un "pete".

### Diseño consistente
* Todo el diseño usa **variables CSS**.
* Si cambias un color o sombra en `variables.css`, se actualiza en toda la web.

### Código limpio y reutilizable
* Todo está en **módulos ES6** (`imports`/`exports`), así que no hay líos de variables globales.
* La tabla se renderiza desde un módulo propio (`economato-ui.js`), separado de la lógica de datos.

---
---
## Puntos Débiles

### Recepción Rápida depende de un mapeo manual
* **Problema:** La recepción rápida no busca productos por `codigoBarras` en la API. Usa un mapeo manual de “código largo → id”.


### La tabla pierde su configuración al navegar
* **Problema:** Cada vez que sales y vuelves al inventario, la tabla se reinicia (pierdes búsqueda, orden y página).
* **Mejora:** Guardar el estado de la tabla (filtros, paginación...) en `sessionStorage` o `localStorage`.

### No hay alertas visuales de stock bajo
* **Problema:** No se marca en rojo (o similar) cuando el stock está por debajo del mínimo.
* **Mejora:** Destacar esas filas desde `economato-ui.js` aplicando estilos de alerta CSS.
