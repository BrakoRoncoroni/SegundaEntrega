# Aplicación e‑commerce (Express + Handlebars)

## Resumen
Pequeña aplicación servidor-renderizada que muestra un catálogo de productos, administra un carrito y ofrece páginas administrativas/ofertas. Ideal como proyecto didáctico para aprender el flujo servidor → vistas con Express y Handlebars.

## Propósito
Demostrar la arquitectura básica de una aplicación Node.js con rutas Express que renderizan vistas Handlebars, manejo de assets estáticos y una estructura modular de rutas y vistas.

## Stack tecnológico
- Node.js
- Express
- Handlebars (motor de plantillas)
- CSS e imágenes en `public/`

## Estructura clave
- `index.js` — Punto de entrada del servidor.
- `src/app.js` — Configuración de Express (middleware, view engine, static).
- `src/config/config.js` — Configuraciones y variables.
- `src/routes/` — Routers: `products.router.js`, `cart.router.js`, `users.router.js`.
- `src/views/` — Plantillas Handlebars (layouts, pages, partials).
- `public/` — Archivos estáticos (CSS, imágenes).

## Cómo ejecutar (local)
```bash
cd api
npm install
npm start
```
Si no existe el script `start` en `package.json`, ejecutar:
```bash
node index.js
```

## Detalles importantes
- Las vistas usan `layouts` y `partials` (`header`, `nav`, `footer`) para consistencia visual.
- Revisar `src/config/config.js` para puerto y otras variables de entorno.
- La lógica del carrito y las rutas principales está en `src/routes/`.

## Dónde mirar primero
1. `index.js` → arranque y carga de `src/app.js`.
2. `src/app.js` → middleware y configuración del motor de vistas.
3. `src/routes/` → ver endpoints y controladores.
4. `src/views/pages/` → revisar las páginas renderizadas.

---
Si quieres, puedo adaptar este README a formato más extenso, añadir badges, o añadir scripts exactos sacados de `package.json`.
