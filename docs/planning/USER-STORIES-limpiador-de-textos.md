# Limpiador de Textos y Enlaces — User Stories

> **Versión**: 1.0
> **Estado**: APROBADO
> **Fecha**: 2026-07-07
> **PDR**: PDR-limpiador-de-textos.md
> **Tech Spec**: TECH-SPEC-limpiador-de-textos.md
> **Total Stories**: 7 (P0: 6 | P1: 1 | P2: 0)

---

## User Journey Map

```
Llega a la página → Pega texto → Aplica transformación(es) → Copia resultado
                                        │
                                        └─→ (variante) Extrae emails/links → Copia lista
```

## Resumen de Epics

| Epic                                   | Stories         | Prioridad | Descripción                                                                 |
| -------------------------------------- | --------------- | --------- | --------------------------------------------------------------------------- |
| Epic 1: Limpieza de Texto en el Editor | US-001 a US-004 | P0        | Las transformaciones in-place: espacios, UTM, mayús/minús, copiar resultado |
| Epic 2: Extracción de Datos            | US-005 a US-006 | P0        | Extraer emails/links de un bloque de texto y copiar la lista                |
| No-Funcionales                         | US-007          | P1        | Medición del KPI de retorno definido en el PDR                              |

---

## Epic 1: Limpieza de Texto en el Editor

> El corazón de la herramienta: el usuario pega texto una vez y puede aplicar, en cualquier orden, las transformaciones que necesite sobre el mismo resultado.

### US-001: Limpiar espacios dobles y sobrantes

**Como** marketer que pega copys desde Word o Google Docs
**Quiero** eliminar con un click los espacios dobles y los espacios sobrantes al inicio/final de cada línea
**Para** no tener que revisar el texto manualmente antes de publicarlo

**Acceptance Criteria:**

Funcionalidad:

- [ ] Al hacer click en "Limpiar espacios", el texto en el área principal colapsa cualquier secuencia de 2+ espacios en uno solo
- [ ] Se recortan los espacios al inicio y final de cada línea (trim por línea)
- [ ] Se eliminan líneas en blanco consecutivas, dejando máximo una línea vacía entre párrafos
- [ ] El resultado reemplaza el contenido del área de texto (in-place)

Validaciones:

- [ ] Si el área de texto está vacía, el botón "Limpiar espacios" aparece deshabilitado

Error Handling:

- [ ] Si el texto supera ~50,000 caracteres, se muestra el aviso "Texto muy largo — puede tardar un poco más" pero la transformación igual se ejecuta

UX:

- [ ] La transformación se aplica en menos de 300ms percibido, sin pantalla de carga necesaria

**Prioridad:** P0
**Estimación:** S
**Dependencias:** Ninguna

---

### US-002: Limpiar parámetros de tracking de enlaces

**Como** marketer que comparte links en redes sociales
**Quiero** eliminar los parámetros de tracking (`utm_source`, `utm_medium`, `fbclid`, `gclid`, etc.) de cualquier URL dentro de mi texto
**Para** compartir links limpios sin exponer de dónde los saqué ni arrastrar tracking ajeno

**Acceptance Criteria:**

Funcionalidad:

- [ ] Al hacer click en "Limpiar enlaces", el sistema detecta todas las URLs dentro del texto pegado
- [ ] Modo default: elimina solo parámetros de tracking conocidos (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `fbclid`, `gclid`, `mc_eid`, `mc_cid`)
- [ ] Modo agresivo (opcional, activable con un toggle): elimina TODOS los parámetros de query de cada URL detectada
- [ ] Si una URL queda sin parámetros después de la limpieza, el `?` sobrante también se elimina
- [ ] El resto del texto (fuera de las URLs) permanece intacto

Validaciones:

- [ ] Si no hay ninguna URL en el texto, el botón "Limpiar enlaces" aparece deshabilitado o muestra "No se encontraron enlaces" al hacer click

Error Handling:

- [ ] URLs malformadas (ej. sin protocolo, truncadas) se dejan sin modificar — nunca se "arregla" ni se rompe una URL al intentar limpiarla

UX:

- [ ] El toggle de modo agresivo tiene un texto claro: "Eliminar TODOS los parámetros (no solo tracking)" para que el usuario entienda el riesgo de romper links con query params legítimos

**Prioridad:** P0
**Estimación:** M
**Dependencias:** Ninguna
**Notas técnicas:** Regex de detección de URL debe evitar backtracking catastrófico con textos largos (ver Tech Spec §13)

---

### US-003: Convertir mayúsculas y minúsculas

**Como** redactor que recibe texto mal formateado
**Quiero** convertir el texto a MAYÚSCULAS, minúsculas, Tipo Título o Tipo Oración con un click
**Para** normalizar el formato sin reescribir el texto a mano

**Acceptance Criteria:**

Funcionalidad:

- [ ] El usuario puede elegir entre 4 modos: MAYÚSCULAS, minúsculas, Tipo Título (Cada Palabra Así), Tipo Oración (Solo la primera letra de cada oración)
- [ ] La conversión respeta acentos y caracteres especiales del español (ej. "ó" → "Ó")
- [ ] El resultado reemplaza el contenido del área de texto (in-place)

Validaciones:

- [ ] Si el área de texto está vacía, los botones de conversión aparecen deshabilitados

Error Handling:

- [ ] No aplica lógica de error adicional — la conversión de texto no puede "fallar" con un input válido

UX:

- [ ] Los 4 modos son claramente distinguibles (no ambiguos entre "Tipo Título" y "Tipo Oración")

**Prioridad:** P0
**Estimación:** S
**Dependencias:** Ninguna

---

### US-004: Copiar el resultado limpio

**Como** cualquier usuario de la herramienta
**Quiero** copiar el texto ya limpio al portapapeles con un solo click
**Para** pegarlo directamente donde lo necesito sin seleccionar manualmente

**Acceptance Criteria:**

Funcionalidad:

- [ ] Un botón "Copiar" copia el contenido actual del área de texto al portapapeles usando `navigator.clipboard`
- [ ] Al copiar exitosamente, se muestra un toast de confirmación: "Copiado al portapapeles"

Validaciones:

- [ ] Si el área de texto está vacía, el botón "Copiar" aparece deshabilitado

Error Handling:

- [ ] Si `navigator.clipboard` no está disponible (navegador viejo o contexto no seguro), se usa un fallback (`document.execCommand('copy')` o selección manual del texto) y se informa igual el resultado al usuario
- [ ] Si la copia falla completamente, se muestra: "No pudimos copiar automáticamente. Selecciona el texto y copia con Ctrl+C"

UX:

- [ ] El toast desaparece automáticamente después de ~2 segundos

**Prioridad:** P0
**Estimación:** S
**Dependencias:** Ninguna

---

## Epic 2: Extracción de Datos

> Variante del flujo principal: en vez de transformar el texto in-place, se extrae información específica a un panel separado.

### US-005: Extraer emails y links de un bloque de texto

**Como** operador que recibe bloques de texto grandes (logs, listas de contacto, contenido scrapeado)
**Quiero** extraer automáticamente todos los emails y links que aparecen en el texto
**Para** no tener que buscarlos manualmente uno por uno

**Acceptance Criteria:**

Funcionalidad:

- [ ] Al hacer click en "Extraer emails/links", el sistema analiza el texto del área principal (sin modificarlo)
- [ ] El resultado se muestra en un panel separado, dividido en dos secciones: "Emails encontrados" y "Links encontrados"
- [ ] Cada sección lista los resultados encontrados, uno por línea, sin duplicados
- [ ] El texto original en el área principal permanece sin cambios

Validaciones:

- [ ] Si el área de texto está vacía, el botón "Extraer emails/links" aparece deshabilitado

Error Handling:

- [ ] Si no se encuentra ningún email ni link, el panel muestra: "No se encontraron emails ni enlaces en este texto"
- [ ] Si se encuentran emails pero no links (o viceversa), solo se muestra la sección con resultados; la otra indica "Ninguno encontrado"

UX:

- [ ] El panel de resultados es claramente distinguible del área de texto principal (no se confunden como el mismo campo)

**Prioridad:** P0
**Estimación:** M
**Dependencias:** Ninguna
**Notas técnicas:** Regex de emails y URLs deben estar testeadas contra falsos positivos comunes (ej. versiones de archivo tipo "1.2.3" no deben matchear como link)

---

### US-006: Copiar la lista de resultados extraídos

**Como** operador que extrajo emails o links
**Quiero** copiar la lista completa de resultados con un click
**Para** pegarla directamente en mi hoja de cálculo o herramienta de CRM

**Acceptance Criteria:**

Funcionalidad:

- [ ] Cada sección del panel de extracción (emails, links) tiene su propio botón "Copiar lista"
- [ ] Al copiar, se incluyen todos los resultados de esa sección, uno por línea, sin numeración ni viñetas
- [ ] Se muestra el mismo toast de confirmación que en US-004: "Copiado al portapapeles"

Validaciones:

- [ ] Si una sección no tiene resultados, su botón "Copiar lista" aparece deshabilitado

Error Handling:

- [ ] Mismo fallback que US-004 si `navigator.clipboard` no está disponible

UX:

- [ ] Los dos botones de copiar (emails / links) son independientes entre sí

**Prioridad:** P0
**Estimación:** S
**Dependencias:** US-005 (Extraer emails y links)

---

## Stories No-Funcionales

### US-007: Medición de retorno de usuarios

**Como** responsable del producto
**Quiero** medir cuántos usuarios vuelven a usar la herramienta dentro de 30 días
**Para** validar la hipótesis central del negocio ("se guarda en marcadores y se usa varias veces al día") sin encuestar a nadie

**Acceptance Criteria:**

Funcionalidad:

- [ ] Se integra Vercel Analytics en la página principal
- [ ] El dashboard de analytics permite ver visitas totales, visitas únicas y tráfico recurrente aproximado
- [ ] No se envía ningún contenido del texto del usuario a analytics — solo eventos de página vistos

Validaciones:

- [ ] N/A (no es una feature interactiva)

Error Handling:

- [ ] Si el script de analytics falla en cargar (bloqueador de ads, etc.), la herramienta funciona con total normalidad — analytics nunca bloquea la funcionalidad core

**Prioridad:** P1
**Estimación:** S
**Dependencias:** Ninguna
**Notas técnicas:** Ver Tech Spec §7.1 — integración nativa de Vercel, sin API key manual

---

## Resumen de Dependencias

```
US-001 (Limpiar espacios)  ─┐
US-002 (Limpiar enlaces)    ├─→ US-004 (Copiar resultado) — todas comparten el mismo botón de copiar
US-003 (Convertir case)    ─┘

US-005 (Extraer emails/links) → US-006 (Copiar lista extraída)

US-007 (Analytics) — independiente, sin dependencias
```

## Stories Diferidos (Post-MVP)

| Story                                                      | Epic   | Razón de Diferimiento                                                         | Fase Tentativa |
| ---------------------------------------------------------- | ------ | ----------------------------------------------------------------------------- | -------------- |
| Historial de limpiezas (localStorage)                      | Nuevo  | No valida la hipótesis central, agrega complejidad de estado                  | Fase 2         |
| Batch processing (múltiples textos/archivos)               | Nuevo  | Requiere manejo de archivos, fuera del scope "sin backend" del MVP            | Fase 2         |
| API pública de limpieza                                    | Nuevo  | Requiere backend real + rate limiting, contradice el enfoque MVP sin servidor | Fase 2         |
| Limpieza avanzada (caracteres invisibles, acentos, emojis) | Epic 1 | No mencionado como dolor específico en el PDR — validar demanda primero       | Fase 2         |

---

_User Stories generados con el pipeline de MVP La Herrería_
