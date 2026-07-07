# Clintext

🔗 **Live:** https://clintext-pawell-ai-brosh.vercel.app

Limpiador de textos y enlaces — pega texto sucio, un click, sale texto limpio.

Quita espacios dobles, elimina parámetros de tracking de URLs (`utm_source`,
`fbclid`, `gclid`, etc.), convierte mayúsculas/minúsculas, y extrae emails y
links de un bloque de texto grande. Todo se procesa en el navegador — nada se
sube a ningún servidor.

## Stack

Next.js 16 + TypeScript + Tailwind CSS 4. Sin backend, sin base de datos, sin
autenticación — 100% client-side por diseño (ver `docs/planning/TECH-SPEC-limpiador-de-textos.md`).

## Desarrollo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Tests

```bash
npm run test       # Vitest — funciones puras de limpieza
npm run test:e2e   # Playwright — flujo end-to-end
```

## Documentación del producto

Todo el proceso de diseño (viabilidad, modelo de negocio, PDR, tech spec,
user stories, design system) vive en `docs/planning/` y `DESIGN.md`. El plan
de lanzamiento está en `BLUEPRINT-limpiador-de-textos.md`.

## Deploy

Desplegado en [Vercel](https://vercel.com) — página estática, sin variables
de entorno requeridas. Auto-deploy conectado al repo de GitHub: cada push a
`master` dispara un nuevo deploy de producción.
