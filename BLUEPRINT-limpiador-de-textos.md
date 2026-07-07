# Limpiador de Textos y Enlaces — Blueprint (Lean, Modo MVP)

> **Versión:** 1.0
> **Fecha:** 2026-07-07
> **Estado:** MVP CONSTRUIDO — pendiente deploy y validación
> **Documentos Fuente:**
>
> - Viability: `docs/planning/VIABILITY-limpiador-de-textos.md`
> - BMC: `docs/planning/BMC-limpiador-de-textos.md`
> - PDR: `docs/planning/PDR-limpiador-de-textos.md`
> - Tech Spec: `docs/planning/TECH-SPEC-limpiador-de-textos.md`
> - User Stories: `docs/planning/USER-STORIES-limpiador-de-textos.md`
> - Design System: `DESIGN.md` / `docs/planning/UI-limpiador-de-textos.md`

---

## Visión del Producto

Una herramienta web gratuita, sin cuentas, que limpia texto y enlaces pegados por
el usuario: colapsa espacios dobles, elimina parámetros de tracking de URLs,
convierte mayúsculas/minúsculas, y extrae emails/links de un bloque de texto
grande. Todo el procesamiento ocurre en el navegador — nada se sube a un servidor.
Es una utilidad de nicho, de bajo dolor pero alta frecuencia: el objetivo del MVP
no es maximizar features, sino validar que la gente la usa de forma recurrente.

---

## Estado Actual: MVP Ya Construido

A diferencia de un Blueprint tradicional (que planifica trabajo futuro), este
proyecto se construyó completo durante la sesión de diseño — el pipeline de
La Herrería y la implementación ocurrieron en el mismo flujo. Este documento
funciona como **checklist de lo hecho + lo que falta antes de lanzar**, no como
plan de fases futuras.

### ✅ Completado

| Área                   | Detalle                                                                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stack                  | Next.js 16 + TypeScript + Tailwind CSS 4, sin backend (100% client-side)                                                                            |
| Funciones core         | `cleanSpaces`, `cleanTrackingParams`, `changeCase`, `extractEmailsAndLinks` en `src/features/text-cleaner/lib/`                                     |
| Tests unitarios        | 31 tests Vitest, todos pasando (edge cases: URLs malformadas, paréntesis balanceados, ReDoS guard, textos vacíos)                                   |
| UI                     | Pantalla única implementada en `src/app/page.tsx` + `src/features/text-cleaner/components/`                                                         |
| Design System          | Dirección "Editorial de Sala de Redacción" documentada en `DESIGN.md`, aplicada consistentemente                                                    |
| Verificación funcional | Probado end-to-end con Playwright: limpiar espacios, limpiar UTM, copiar al portapapeles (con toast), extraer emails/links — sin errores de consola |
| E2E versionado         | `e2e/happy-path.spec.ts` — 2 tests (`npm run test:e2e`), ambos pasando                                                                              |
| Build de producción    | `npm run build` exitoso, página estática (`○ /`)                                                                                                    |
| Typecheck + Lint       | Sin errores                                                                                                                                         |

### ⬜ Pendiente Antes de Lanzar

| Tarea                                                                                  | Por qué falta                                                          | Estimación |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------- |
| Integrar Vercel Analytics (US-007)                                                     | Necesario para medir la métrica de éxito del MVP (retorno de usuarios) | 15-20 min  |
| Inicializar repositorio Git                                                            | El proyecto no tiene control de versiones todavía                      | 5 min      |
| Crear cuenta/proyecto en Vercel y hacer deploy                                         | Aún corre solo en local                                                | 15-30 min  |
| Registrar dominio (opcional) o usar subdominio `.vercel.app`                           | Decisión de negocio, no bloqueante                                     | —          |
| Revisar SEO on-page básico (meta description ya está, falta OG image y favicon custom) | El PDR/BMC identifican SEO long-tail como canal principal              | 30 min     |

**Estimación total para estar listo para lanzar:** medio día de trabajo.

---

## Stack Técnico (Referencia Rápida)

| Capa          | Tecnología                                                                     | Para qué                                                     |
| ------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| Framework     | Next.js 16 (App Router)                                                        | Hosting estático + rutas SEO futuras                         |
| Lenguaje      | TypeScript (strict)                                                            | Tipado de las funciones puras                                |
| Estilos       | Tailwind CSS 4 (CSS-first config)                                              | Design system vía `@theme inline` en `globals.css`           |
| UI primitives | Componentes propios en `src/shared/ui/` (Button, Textarea) + `sonner` (toasts) | Control total del look editorial, sin defaults de shadcn     |
| Backend       | Ninguno                                                                        | Todo el procesamiento es client-side por diseño (privacidad) |
| Testing       | Vitest (unit) + Playwright (E2E, pendiente de versionar)                       | Cobertura de las funciones puras                             |
| Hosting       | Vercel (pendiente de conectar)                                                 | Deploy gratis, cero config                                   |

### Servicios Externos

| Servicio         | Necesita API Key                            | Costo                   |
| ---------------- | ------------------------------------------- | ----------------------- |
| Vercel Analytics | No (integración nativa al conectar el repo) | Gratis en el tier usado |

### Estructura de Carpetas (ya implementada)

```
mi-limpiador-de-texto/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Fuentes (Fraunces/Instrument Sans/IBM Plex Mono) + Toaster
│   │   ├── page.tsx            # Pantalla única
│   │   └── globals.css         # Design tokens (Tailwind v4 @theme inline)
│   ├── features/text-cleaner/
│   │   ├── components/         # TextCleanerTool, CleanerToolbar, ExtractPanel, CopyButton
│   │   ├── lib/                # Funciones puras + __tests__/
│   │   └── types.ts
│   └── shared/
│       ├── ui/                 # Button, Textarea
│       └── lib/utils.ts        # cn()
├── docs/planning/               # BMC, PDR, Tech Spec, User Stories, Viability, UI docs
├── DESIGN.md                    # Design system portable (root)
└── BLUEPRINT-limpiador-de-textos.md  # Este documento
```

---

## Checklist de Lanzamiento (única "fase")

> **Entregable:** La herramienta pública, accesible por URL, con analytics activo.
> **Depende de:** Nada — el código ya funciona en local.

- [ ] Inicializar git (`git init`, primer commit)
- [ ] Crear repo en GitHub y hacer push
- [ ] Conectar el repo a Vercel y hacer el primer deploy
- [ ] Confirmar que Vercel Analytics queda activo automáticamente (o agregar `@vercel/analytics` si el proyecto no usa la integración nativa)
- [x] Versionar el E2E de Playwright (`e2e/happy-path.spec.ts`) cubriendo: limpiar espacios + limpiar UTM + copiar, y extraer emails/links + copiar lista
- [ ] Agregar favicon y OG image propios (actualmente usa los defaults de Next.js)
- [ ] Publicar en 1-2 comunidades (Product Hunt, r/webdev, Indie Hackers) — canal de adquisición inicial definido en el BMC
- [ ] Smoke test manual en mobile real (Safari iOS + Chrome Android) — verificar que `navigator.clipboard` funciona en ambos

### Criterios de Aceptación del Lanzamiento

- [ ] La URL pública carga en <1.8s (First Contentful Paint, target del Tech Spec)
- [ ] Las 4 transformaciones funcionan en producción igual que en local
- [ ] El toast de "Copiado" aparece en desktop y mobile
- [ ] Vercel Analytics registra al menos la primera visita

---

## Criterios de Éxito del MVP (de la Viability Check y el PDR)

**Hipótesis central a validar:**

> Las personas que llegan a la herramienta la vuelven a usar — no es un one-off.

| Métrica                                 | Cómo se mide                                         | Umbral de "valida"                                                                        |
| --------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Retorno de usuarios (30 días)           | Vercel Analytics — visitantes que vuelven            | Señal positiva si hay retorno visible más allá de picos de lanzamiento (Product Hunt day) |
| Tiempo a primera transformación exitosa | No instrumentado en MVP — inferible cualitativamente | <10s desde que carga la página (target de diseño)                                         |
| Tráfico orgánico mensual                | Vercel Analytics — fuente de tráfico                 | Crecimiento sostenido mes a mes, no solo picos de lanzamiento                             |

**Ventana de validación sugerida:** 4-6 semanas post-lanzamiento antes de decidir si invertir en el freemium (batch processing, API, extensión de navegador) definido en el BMC.

---

## Qué Construir Después (si el MVP valida)

Del BMC y del PDR, en orden de prioridad si hay señal de retorno de usuarios:

1. **Historial de limpiezas vía `localStorage`** — primer paso hacia retención, sin necesitar backend todavía
2. **Extensión de navegador / bookmarklet** — reduce la fricción de "ir al sitio" para el uso de "varias veces al día"
3. **Batch processing** — para el segmento operator/dev que procesa múltiples bloques de texto
4. **API pública** — solo si hay demanda explícita (requeriría agregar backend real + rate limiting, cruzando la frontera "sin servidor" del MVP)

**Qué NO construir todavía:** cuentas de usuario, pagos, o cualquier feature que rompa la promesa de "cero fricción" antes de tener evidencia de retorno real.

---

## Notas Técnicas

- El proyecto usa Tailwind v4 con configuración CSS-first (`@theme inline` en `globals.css`) — no hay `tailwind.config.ts`, es el patrón nuevo de Tailwind 4.
- `shadcn/ui init` no se pudo correr en este entorno (CLI interactivo sin soporte de stdin no-TTY) — se optó por implementar los primitivos (`Button`, `Textarea`) a mano con `class-variance-authority`, lo cual además encaja mejor con un design system 100% custom que no parte de los presets de shadcn.
- Las regex de detección de URLs/emails están documentadas y testeadas contra ReDoS (ver `url-utils.ts` y los tests con inputs de 20,000+ caracteres).
- Hay dos lockfiles en el árbol de directorios (uno en `C:\Users\USER\` y otro en el proyecto) — se configuró `turbopack.root` en `next.config.ts` para evitar ambigüedad, pero vale la pena limpiar el lockfile externo si no pertenece a otro proyecto activo.

---

## Changelog

| Fecha      | Versión | Cambios                                                                       |
| ---------- | ------- | ----------------------------------------------------------------------------- |
| 2026-07-07 | 1.0     | Blueprint inicial — MVP completo construido en la misma sesión de La Herrería |
