# BMC-limpiador-de-textos (Versión Lean — Modo MVP)

> Business Model Canvas generado por Forge · 2026-07-07
> Versión lean: se omite VPC detallado y estructura de costos exhaustiva (ver `routes/mvp.md`).

## Hipótesis Central a Validar

> "Las personas que llegan a esta herramienta la vuelven a usar (no es un one-off) —
> validando la promesa de 'se guarda en marcadores y se usa 3 veces al día'."

Métrica de validación: **tasa de usuarios que vuelven** (return visits) en las primeras
2-4 semanas post-lanzamiento, no solo tráfico total.

---

## 1. Customer Segments

| Segmento                                            | Descripción                                                                                                                                                           |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Marketers / Social Media Managers**               | Pegan copys y links constantemente; necesitan quitar `utm_*` antes de compartir, corregir mayúsculas en titulares, limpiar espacios de contenido copiado de Word/Docs |
| **Devs / No-coders / Operators**                    | Reciben bloques de texto (logs, scraping, listas de contactos) y necesitan extraer rápido todos los emails o links sin escribir una regex                             |
| **Asistentes virtuales / Estudiantes / Redactores** | Limpieza de texto repetitiva como parte de su flujo diario (formatear notas, preparar reportes, revisar tareas copiadas)                                              |

**Supuesto a validar:** No hay evidencia de mercado (no se hicieron entrevistas de usuario) — la segmentación se basa en intuición sobre quién genera este tipo de fricción con más frecuencia.

---

## 2. Value Propositions

**Propuesta central:** _"Pega texto sucio, un click, texto limpio — sin cuenta, sin subir tus datos a ningún servidor."_

- **Todo en un solo lugar:** 4 transformaciones (espacios dobles, limpieza de UTM, mayús/minús, extracción de emails/links) en una sola pantalla — evita usar 4 herramientas distintas.
- **Cero fricción:** sin registro, sin login, resultado instantáneo.
- **Privacidad como feature:** procesamiento 100% client-side (en el navegador) — diferenciador real frente a herramientas que mandan tu texto a un servidor, relevante para quien pega datos sensibles (emails, listas de contacto).

---

## 3. Channels

| Canal                          | Rol                                                                                                                                                                                       |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SEO long-tail**              | Landing pages/secciones por función específica: "quitar utm de un link", "convertir texto a mayúsculas online", "extraer emails de un texto" — capturan búsquedas de intención específica |
| **Comunidades de lanzamiento** | Product Hunt, Indie Hackers, r/webdev, r/SideProject — tracción inicial y feedback temprano                                                                                               |
| **Bookmarkability**            | El propio producto es el canal de retención: si resuelve bien, el usuario lo guarda y vuelve (no depende de canal recurrente de marketing)                                                |

---

## 4. Revenue Streams (MVP: ninguno — validado como freemium futuro)

**MVP:** 100% gratis, sin monetización. El objetivo es validar uso recurrente, no ingresos.

**Freemium futuro (post-validación):**

- Batch processing (limpiar múltiples textos/archivos a la vez)
- API para automatizar limpieza (integraciones, Zapier, etc.)
- Extensión de navegador / bookmarklet "Pro" con historial de limpiezas

---

## 5. Cost Structure (simplificada)

- Hosting: Vercel free tier (frontend estático, sin backend en MVP) → **$0**
- Dominio: único costo real recurrente (~$10-15/año)
- Sin DB, sin auth, sin APIs externas → costo operativo prácticamente nulo

---

## Risk Points

1. **Mercado difuso** — segmentos amplios sin canal de adquisición pagado obvio (heredado del Viability Check).
2. **Competencia fragmentada ya posicionada** en SEO para cada función individual por separado.
3. **Techo de monetización bajo** — validar uso antes de construir cualquier feature premium.

---

## Nota sobre VPC

En modo MVP lean, el Value Proposition Canvas detallado por segmento se omite —
la propuesta de valor ya está suficientemente acotada en el bloque 2 para pasar
directo al PDR. Se puede generar un VPC completo más adelante si el MVP valida
y se migra a la ruta SaaS Completo.

---

## Siguiente Paso

Proceder con **Step 2 (PDR Generator)** del pipeline 🚀 MVP para Validar.
