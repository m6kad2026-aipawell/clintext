# Limpiador de Textos y Enlaces — Technical Specifications

> **Tech Spec v1.0**
> **Estado**: APROBADO
> **Fecha**: 2026-07-07
> **PDR de referencia**: PDR-limpiador-de-textos.md

---

## 1. Resumen Ejecutivo

### Problema (del PDR)

Personas que manejan texto y enlaces a diario pierden tiempo limpiando espacios, parámetros de tracking, mayús/minús y extrayendo emails/links a mano.

### Solución Técnica

Una SPA construida sobre Next.js que ejecuta funciones puras de transformación de texto 100% en el navegador — sin backend, sin base de datos, sin red de por medio para el procesamiento.

### Complejidad Estimada

**Simple** (más simple que el Golden Path estándar) — sin persistencia, sin auth, sin integraciones externas. El único "backend" es analytics.

---

## 2. Stack Tecnológico

### 2.1 Tabla Resumen

| Capa       | Tecnología                    | Versión         | Justificación                                                                    |
| ---------- | ----------------------------- | --------------- | -------------------------------------------------------------------------------- |
| Framework  | Next.js                       | 16 (App Router) | Deploy directo en Vercel + facilita agregar páginas SEO por función en el futuro |
| Language   | TypeScript                    | 5.x (strict)    | Tipar bien las funciones puras de limpieza                                       |
| Styling    | Tailwind CSS                  | 4.x             | Estándar del proyecto                                                            |
| Components | shadcn/ui                     | latest          | Textarea, Button, Tabs, Toast                                                    |
| State Mgmt | React `useState`/`useReducer` | —               | Estado efímero de una sola pantalla, no requiere librería                        |
| Validation | N/A                           | —               | No hay inputs de formulario que requieran schema — solo texto libre              |
| Backend    | N/A (ninguno)                 | —               | Todo el procesamiento ocurre en el cliente                                       |
| Database   | N/A                           | —               | Nada que persistir                                                               |
| Auth       | N/A                           | —               | No hay cuentas de usuario                                                        |
| Storage    | N/A                           | —               | No hay archivos que guardar                                                      |
| Payments   | N/A (MVP gratis)              | —               | Ver freemium futuro en BMC                                                       |
| Email      | N/A                           | —               | No hay notificaciones                                                            |
| Hosting    | Vercel                        | —               | Deploy gratis, cero config, ideal para Next.js estático                          |
| Testing    | Vitest + Playwright           | latest          | Vitest para las funciones puras (crítico), Playwright para 1 E2E del happy path  |
| Monitoring | Vercel Analytics              | —               | Sin cookies, mide el KPI principal (retorno) definido en el PDR                  |

### 2.2 Decisiones Técnicas Importantes

**Sin backend: todo client-side**

- Razón: el PDR es explícito — el texto pegado puede contener datos sensibles (emails, info personal) y la propuesta de valor central es "no sube tus datos a ningún servidor".
- Trade-off: no hay forma de medir uso agregado más allá de analytics de página (no sabemos QUÉ transformación usa cada quien, solo que visitan/vuelven).
- Reevaluar si: en Fase 2 se agrega alguna feature que sí requiera servidor (API pública, batch processing con archivos grandes).

**Next.js en vez de Vite + React SPA puro**

- Razón: el canal de adquisición principal (BMC) es SEO long-tail por función ("quitar utm de un link", etc.). Next.js permite agregar rutas `/herramientas/quitar-utm` como páginas estáticas indexables sin reestructurar el proyecto después.
- Trade-off: algo más de boilerplate que un SPA puro para una sola pantalla.
- Reevaluar si: si el SEO no genera tráfico en 2-3 meses, la complejidad extra de Next.js no se justificó — pero el costo de haberlo usado es bajo.

**Sin Zustand / librería de estado global**

- Razón: una sola pantalla, un solo texto en memoria, sin estado compartido entre rutas.
- Reevaluar si: se agrega historial de limpiezas en Fase 2 (requeriría estado más complejo, posiblemente persistido en `localStorage`).

### 2.3 Lo Que NO Se Incluye (y por qué)

| Tecnología              | Razón de exclusión                                                                            | Agregar en                                                      |
| ----------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Supabase (DB/Auth)      | No hay nada que persistir ni usuarios que autenticar                                          | Si Fase 2 agrega historial de usuario o cuentas                 |
| Stripe                  | MVP gratis, sin monetización                                                                  | Si el freemium del BMC se activa post-validación                |
| Resend                  | No hay emails transaccionales                                                                 | No previsto                                                     |
| Upstash / Rate limiting | No hay endpoints de servidor que proteger                                                     | Si se agrega una API pública (Fase 2)                           |
| Sentry                  | Sin backend, superficie de error mínima; los errores de UI se manejan con boundaries + toasts | Si crece el tráfico y se necesita triage de errores client-side |
| Zustand                 | Estado trivial de una sola pantalla                                                           | Si se agrega estado complejo entre rutas                        |

---

## 3. Arquitectura

### 3.1 Diagrama de Alto Nivel

```
┌──────────────────────────────────────────────┐
│                  Browser                      │
│                                                │
│  ┌──────────────┐      ┌──────────────────┐  │
│  │  Next.js App │─────▶│  Funciones puras  │  │
│  │  (Client     │◀─────│  de limpieza      │  │
│  │  Components) │      │  (lib/*.ts)       │  │
│  └──────────────┘      └──────────────────┘  │
│         │                                     │
│         ▼                                     │
│  ┌──────────────┐                             │
│  │ navigator.   │  (copiar resultado)          │
│  │ clipboard    │                             │
│  └──────────────┘                             │
└──────────────────────────────────────────────┘
         │
         ▼ (solo page views, sin datos de texto)
┌──────────────────────────────────────────────┐
│           Vercel (Static Hosting)             │
│           + Vercel Analytics                  │
└──────────────────────────────────────────────┘
```

No hay llamadas de red durante el uso de la herramienta — el único tráfico de red es la carga inicial de la página y el ping de analytics (sin contenido del usuario).

### 3.2 Arquitectura de Carpetas

```
src/
├── app/
│   ├── layout.tsx              # Layout raíz + metadata SEO base
│   ├── page.tsx                # Pantalla principal de la herramienta
│   └── globals.css             # Tailwind base
├── features/
│   └── text-cleaner/
│       ├── components/
│       │   ├── TextCleanerTool.tsx   # Contenedor principal (estado + orquestación)
│       │   ├── CleanerToolbar.tsx    # Botones de transformación
│       │   ├── ExtractPanel.tsx      # Panel de resultado para emails/links
│       │   └── CopyButton.tsx        # Botón de copiar con feedback (toast)
│       ├── lib/
│       │   ├── clean-spaces.ts       # Colapsar espacios dobles / trim de líneas
│       │   ├── clean-urls.ts         # Eliminar params de tracking de URLs
│       │   ├── text-case.ts          # MAYÚSCULAS/minúsculas/Título/Oración
│       │   ├── extract.ts            # Extraer emails y links
│       │   └── __tests__/            # Vitest — un archivo de test por función
│       └── types.ts             # Tipos compartidos del feature
└── shared/
    ├── ui/                     # Componentes shadcn/ui (Button, Textarea, Tabs, Toast)
    └── lib/
        └── utils.ts            # cn() y utilidades genéricas
```

### 3.3 Componentes del Sistema

**Componente: `TextCleanerTool`**

- Propósito: contenedor de la pantalla principal, dueño del estado del texto
- Tecnología: React Client Component
- Responsabilidades: mantener el texto actual en estado, invocar las funciones de `lib/` al hacer click en un botón, mostrar el panel de extracción cuando aplica
- Se comunica con: `CleanerToolbar`, `ExtractPanel`, `CopyButton`, funciones puras de `lib/`
- Escala: no necesita escalar — una instancia por sesión de navegador

**Componente: funciones puras (`lib/*.ts`)**

- Propósito: lógica de transformación de texto, sin efectos secundarios
- Tecnología: TypeScript puro, testeable sin DOM
- Responsabilidades: `cleanSpaces(text)`, `cleanTrackingParams(text, mode)`, `changeCase(text, mode)`, `extractEmailsAndLinks(text)`
- Se comunica con: nada externo — reciben string, devuelven string o `{ emails: string[], links: string[] }`

### 3.4 Flujo de Datos

```
Usuario pega texto → onChange → setState(texto)
Usuario click "Limpiar espacios" → cleanSpaces(texto) → setState(resultado)
Usuario click "Limpiar UTM" → cleanTrackingParams(texto, modo) → setState(resultado)
Usuario click "Extraer emails/links" → extractEmailsAndLinks(texto) → setState(panelResultado)
                                        (el texto principal NO se modifica en este caso)
Usuario click "Copiar" → navigator.clipboard.writeText(resultado) → toast "Copiado"
```

---

## 4. Base de Datos

No aplica. No hay entidades persistentes ni base de datos en este proyecto.

---

## 5. API Specifications

No aplica. No hay endpoints de servidor ni Server Actions — toda la lógica corre en el cliente como funciones puras importadas directamente en los componentes.

### 5.1 "Contratos" internos (funciones puras)

```typescript
// clean-spaces.ts
function cleanSpaces(text: string): string;

// clean-urls.ts
type UrlCleanMode = "known-tracking" | "all-query-params";
function cleanTrackingParams(text: string, mode: UrlCleanMode): string;

// text-case.ts
type CaseMode = "upper" | "lower" | "title" | "sentence";
function changeCase(text: string, mode: CaseMode): string;

// extract.ts
interface ExtractResult {
  emails: string[];
  links: string[];
}
function extractEmailsAndLinks(text: string): ExtractResult;
```

---

## 6. Autenticación y Seguridad

No aplica autenticación — no hay cuentas de usuario.

### 6.4 Security Checklist (adaptado a este proyecto)

- [x] HTTPS enforced — por defecto en Vercel
- [x] Sin passwords, sin JWT, sin sesiones — no aplica
- [x] Sin CORS relevante — no hay API propia que exponer
- [x] Sin SQL — no hay base de datos
- [x] **XSS protection**: nunca usar `dangerouslySetInnerHTML` para renderizar el texto del usuario o los links/emails extraídos — siempre renderizar como texto plano de React (auto-escapado)
- [x] Sin CSRF — no hay mutaciones a servidor
- [x] Sin secrets de servidor — el único ID público es el de Vercel Analytics (`NEXT_PUBLIC_*`, no sensible)
- [x] Sin file uploads en MVP
- [x] **ReDoS**: las regex de detección de URLs/emails deben evitar patrones con backtracking catastrófico ante inputs de hasta 50k caracteres — usar regex acotadas y testeadas con inputs largos en Vitest

---

## 7. Integraciones Externas

### 7.1 Vercel Analytics

- **Propósito**: medir el KPI principal del PDR (tasa de retorno a 30 días) y tráfico orgánico
- **Auth method**: automático vía integración de Vercel, sin API key manual
- **Costo estimado**: gratis en el tier usado para este proyecto
- **Fallback si falla**: la herramienta funciona igual — analytics es solo observabilidad, no crítico para la función

---

## 8. Performance

### 8.1 Targets

| Métrica                                       | Target | Máximo Aceptable |
| --------------------------------------------- | ------ | ---------------- |
| First Contentful Paint                        | 1.0s   | 1.8s             |
| Time to Interactive                           | 1.2s   | 2.0s             |
| Tiempo de transformación (texto de 50k chars) | <100ms | 300ms            |

No aplican targets de API/DB — no existen en este proyecto.

### 8.2 Estrategias de Optimización

- Sin caching de servidor necesario (página estática)
- Regex compiladas como constantes a nivel de módulo, no recreadas en cada render/click
- Límite de input: truncar o advertir sobre textos mayores a ~50k caracteres para mantener la transformación por debajo de 300ms
- Code splitting automático de Next.js — la página principal no depende de librerías pesadas

### 8.3 Escalabilidad

Al ser 100% estático y client-side, el "escalado" es trivial: Vercel sirve la página desde CDN, y cada usuario procesa su propio texto en su propio navegador — no hay cuello de botella de servidor posible para la función core. El único límite real es analytics/tráfico, que Vercel maneja de forma nativa.

---

## 9. Error Handling

### 9.1 Casos de Error (client-side)

```typescript
// No hay error codes de servidor. Casos a manejar en UI:
// - Texto vacío al presionar un botón → deshabilitar botón, no lanzar error
// - navigator.clipboard no disponible (contexto no seguro / navegador viejo)
//   → fallback a document.execCommand('copy') o mostrar el texto para copiar manualmente
// - Regex no encuentra coincidencias en extracción → mostrar mensaje "no se encontraron resultados", no error
```

### 9.2 Logging Strategy

No hay logging de servidor. Errores de runtime en cliente se capturan con un Error Boundary de React a nivel de página que muestra un mensaje amigable y permite recargar — sin herramienta de error tracking externa en el MVP.

### 9.3 User-Facing Errors

Toasts (shadcn) para feedback de acciones ("Copiado al portapapeles", "No se encontraron emails/links"). Sin páginas de error dedicadas más allá del error boundary genérico.

---

## 10. Deployment

### 10.1 Environments

| Env         | URL                                             | Propósito | Deploy trigger                     |
| ----------- | ----------------------------------------------- | --------- | ---------------------------------- |
| Development | localhost:3000                                  | Dev local | Manual (`npm run dev`)             |
| Production  | [dominio a definir].vercel.app o dominio propio | Live      | Push a `main` (auto-deploy Vercel) |

No se necesita ambiente de staging separado dado el bajo riesgo de cada deploy (sin backend, sin migraciones de datos).

### 10.2 Environment Variables

**Públicas (client-safe):**

```
NEXT_PUBLIC_VERCEL_ANALYTICS_ID  # provisto automáticamente por la integración de Vercel
```

**Secretas (server-only):**

```
(ninguna requerida en el MVP)
```

### 10.3 CI/CD

Pipeline mínimo antes de cada deploy: `typecheck` → `lint` → `test` (Vitest) → `build`. Vercel corre el build automáticamente en cada push; se recomienda un GitHub Action liviano que corra typecheck + tests en cada PR para no depender solo del build de Vercel para detectar errores.

### 10.4 Infrastructure

Vercel maneja CDN, SSL y DNS si se usa un dominio custom apuntado a Vercel. Sin infraestructura adicional.

---

## 11. Testing Strategy

### 11.1 Approach

| Tipo | Herramienta | Coverage Target           | Qué se testea                                                                                                                                                        |
| ---- | ----------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit | Vitest      | Alto en `lib/*.ts` (>90%) | Las 4 funciones puras de transformación — son el corazón del producto, incluyendo edge cases (texto vacío, URLs malformadas, texto sin emails/links, inputs grandes) |
| E2E  | Playwright  | 1 flujo crítico           | Happy path: pegar texto → aplicar una transformación → copiar resultado                                                                                              |

### 11.2 Testing Commands

```bash
npm run test          # Vitest — funciones puras
npm run test:e2e      # Playwright — happy path
```

### 11.3 E2E Flows Críticos

- Pegar texto con espacios dobles y una URL con `utm_source` → aplicar ambas limpiezas → verificar resultado final → copiar → verificar toast de confirmación
- Pegar bloque de texto con 2 emails y 1 link → extraer → verificar que el panel muestra exactamente esos 3 resultados

---

## 12. Consideraciones Futuras (Post-MVP)

| Feature/Mejora                               | Impacto Técnico                                                                                           | Fase Estimada |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------- |
| Batch processing (múltiples textos/archivos) | Requeriría manejo de archivos y posiblemente Web Workers para no bloquear el hilo principal               | Fase 2        |
| API pública                                  | Requeriría agregar backend real (Next.js Route Handlers) + rate limiting (Upstash)                        | Fase 2        |
| Historial de limpiezas                       | `localStorage` primero (sin backend); si se pide sync entre dispositivos, ahí sí entraría Supabase + Auth | Fase 2/3      |
| Extensión de navegador                       | Proyecto técnico separado (Manifest V3), reutilizando las funciones puras de `lib/`                       | Fase 3        |

---

## 13. Gotchas y Auto-Blindaje

### Regex y Performance

- Las regex de detección de URLs y emails deben evitar cuantificadores anidados que causen backtracking catastrófico (ReDoS) — testear explícitamente con inputs adversariales (líneas muy largas sin espacios) en Vitest.
- Compilar las regex una sola vez a nivel de módulo (`const EMAIL_REGEX = /.../`), nunca dentro de la función que se ejecuta en cada click.

### Clipboard API

- `navigator.clipboard.writeText` requiere contexto seguro (HTTPS) — funciona en Vercel por defecto, pero fallará en `http://localhost` sin certificado en algunos navegadores estrictos. Verificar en desarrollo y tener un fallback simple.

### Next.js App Router

- Marcar `TextCleanerTool` y sus hijos como `"use client"` explícitamente — toda la interacción depende de estado y eventos del navegador.

---

## 14. Convenciones de Código

| Aspecto             | Convención                                                  |
| ------------------- | ----------------------------------------------------------- |
| Variables/Funciones | camelCase                                                   |
| Componentes         | PascalCase                                                  |
| Archivos/Carpetas   | kebab-case (excepto componentes `.tsx`, que van PascalCase) |
| Constantes          | UPPER_SNAKE_CASE                                            |
| Commits             | Conventional Commits                                        |
| Max file length     | ~200 líneas por archivo                                     |
| TypeScript `any`    | Prohibido — usar `unknown` + narrowing                      |

---

_Tech Spec generado con el pipeline de MVP La Herrería_
