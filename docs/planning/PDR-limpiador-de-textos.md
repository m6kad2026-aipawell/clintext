# 📋 PDR: Limpiador de Textos y Enlaces

> **Product Definition Report**
> **Estado**: APROBADO (modo MVP — entrevista abreviada, ver nota al final)
> **Fecha**: 2026-07-07
> **Versión**: 1.0

---

## 1. Problema de Negocio

### El Dolor

Personas que manejan texto y enlaces a diario (marketers, social media managers, devs, asistentes virtuales, redactores) pierden tiempo haciendo limpieza manual repetitiva: quitar espacios dobles pegados desde Word/PDF, eliminar parámetros de tracking (`utm_*`, `fbclid`, `gclid`) antes de compartir un link, normalizar mayúsculas/minúsculas, o extraer a mano emails/links de un bloque de texto grande (un email reenviado, un PDF copiado, una página con datos de contacto).

### El Costo

No es un costo económico directo medible, sino fricción acumulada: varios minutos, varias veces al día, sumados a errores humanos (dejar un `utm` sin querer al compartir, extraer mal un email a ojo desde un bloque largo).

### Situación Actual

Find & replace manual en el editor de turno, herramientas sueltas de un solo propósito (un "UTM stripper" aquí, un "case converter" allá — sin agregación), o simplemente ignorar el ruido y vivir con él.

---

## 2. Propuesta de Valor

### En Una Frase

> Un limpiador de texto y enlaces todo-en-uno que aplica al instante limpieza de espacios, remoción de parámetros de tracking, cambio de mayúsculas/minúsculas y extracción de emails/links — sin cuenta, sin subir tus datos a ningún servidor.

### Flujo Principal (Happy Path)

1. El usuario pega (o escribe) texto en el área principal →
2. Hace click en el botón de la transformación que necesita (ej. "Quitar espacios dobles", "Limpiar UTM", "MAYÚSCULAS") →
3. El sistema aplica la transformación in-place sobre el mismo texto →
4. El usuario puede encadenar otra transformación sobre el resultado ya limpio (ej. después de limpiar espacios, también limpiar UTMs) →
5. El usuario copia el resultado con un botón "Copiar" (feedback visual de confirmación)

### Flujos Alternativos

- **Extracción de emails/links**: no modifica el texto original — muestra un panel de resultado separado con lo encontrado + botón "copiar lista".
- **Edge case — texto vacío**: los botones de acción aparecen deshabilitados o con mensaje sutil de "pega algo primero".
- **Edge case — sin resultados en extracción**: mensaje "no se encontraron emails/links en este texto".
- **Edge case — URL malformada**: se deja tal cual, sin intentar "arreglarla" (evitar romper el link).

---

## 3. Usuario Objetivo

### Persona Principal

- **Rol**: Marketer / Social Media Manager que comparte copys y links a diario y quiere limpiar tracking antes de postear.
- **Contexto**: Trabajo diario de creación/curación de contenido, alto volumen de copy-paste.
- **Nivel técnico**: Intermedio (no-tech, no sabe regex, necesita botones claros).
- **Dispositivo principal**: Desktop, pero debe funcionar bien en mobile (paste desde el portapapeles del celular es común).
- **Frecuencia de uso**: Varias veces al día (la hipótesis central del BMC).

### Personas Secundarias

- **Dev / Operator**: extrae emails o links de bloques de texto (logs, listas, scraping) sin escribir una regex.
- **Asistente virtual / Redactor / Estudiante**: limpieza repetitiva de texto pegado de Word/PDF como parte de su flujo diario.

### TAM Estimado

No cuantificado — segmento amplio y transversal. Marcado explícitamente como **supuesto a validar** con uso real (ver KPI principal), no con encuestas previas.

---

## 4. Arquitectura de Datos

### Input — Qué entra al sistema

| Dato        | Tipo                           | Fuente                                        | Obligatorio |
| ----------- | ------------------------------ | --------------------------------------------- | ----------- |
| Texto plano | String (hasta ~50k caracteres) | Pegado/escrito por el usuario en el navegador | Sí          |

### Output — Qué sale del sistema

| Dato                            | Tipo   | Destino                        | Formato                    |
| ------------------------------- | ------ | ------------------------------ | -------------------------- |
| Texto transformado              | String | Mismo área de texto (in-place) | Texto plano                |
| Lista de emails/links extraídos | Lista  | Panel de resultado separado    | Texto plano, uno por línea |

### Entidades Principales (Modelo Conceptual)

Ninguna persistente. No hay base de datos — todo el estado vive en el cliente (React state) durante la sesión del navegador. **No se envía ni se guarda texto en ningún servidor.**

---

## 5. KPIs de Éxito

### Métrica Principal

% de usuarios que vuelven a usar la herramienta dentro de 30 días (return rate) — valida la hipótesis central del BMC ("se guarda en marcadores y se usa varias veces al día").

### Métricas Secundarias

- Tiempo hasta la primera transformación exitosa < 10 segundos desde que carga la página
- Tráfico orgánico mensual (proxy de que el SEO long-tail está funcionando)

---

## 6. Modelo de Negocio

### Monetización

MVP: gratis, sin monetización. Freemium futuro (post-validación): batch processing, API de automatización, extensión de navegador "Pro" — definido en `BMC-limpiador-de-textos.md`.

### Competencia

| Competidor                   | Qué hacen                                                                     | Nuestra diferencia                                           |
| ---------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------ |
| UTM strippers online sueltos | Solo limpian parámetros de tracking                                           | Agregan además espacios, case, extracción — un solo lugar    |
| Case converters online       | Solo cambian mayús/minús                                                      | Mismo punto: agregación + cero fricción                      |
| Email/link extractors online | Solo extraen, muchos requieren subir archivo o dan resultados poco confiables | Procesamiento 100% client-side, sin subir nada a un servidor |

### Pricing Tentativo

No aplica en MVP (gratis). Ver freemium futuro en BMC.

---

## 7. Alcance del MVP (Fase 1)

### Features Core (Debe tener)

1. **Limpiar espacios** — colapsa espacios dobles/múltiples y recorta espacios sobrantes al inicio/final de línea.
2. **Limpiar enlaces (UTM/tracking)** — detecta URLs dentro del texto y elimina parámetros de tracking conocidos (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `fbclid`, `gclid`, etc.), con opción de "eliminar todos los parámetros de query" como modo agresivo.
3. **Convertir mayúsculas/minúsculas** — con sub-opciones: MAYÚSCULAS, minúsculas, Tipo Título, Tipo Oración.
4. **Extraer emails y links** — de un bloque de texto grande, resultado en panel separado con botón de copiar.

### Features Diferidas (Fase 2+)

- Batch processing / múltiples textos o archivos a la vez
- API pública para automatizar limpieza
- Extensión de navegador / bookmarklet
- Historial de limpiezas (requeriría auth + DB — fuera de scope MVP por diseño)
- Limpieza avanzada: caracteres invisibles/zero-width, normalización de acentos, emojis

### Explícitamente Fuera de Alcance

- Cuentas de usuario / login — el valor central es "cero fricción", una cuenta la rompe.
- Guardar historial en servidor — por privacidad y porque no aporta al MVP.
- Procesamiento de archivos (PDF, Word) — solo texto plano pegado.
- Traducción o corrección ortográfica — no es el propósito de la herramienta.

---

## 8. Consideraciones Especiales

### Requisitos No Funcionales

- **Autenticación**: No.
- **Roles/Permisos**: No aplica.
- **Pagos/Billing**: No en MVP.
- **Datos Sensibles**: Potencialmente sí — el usuario puede pegar emails o datos personales. Por eso el requisito no funcional crítico es: **procesamiento 100% client-side, el texto nunca se envía a un servidor ni se loggea**.
- **Integraciones**: Ninguna.
- **Multi-idioma**: No en MVP (interfaz en español; la lógica de limpieza es agnóstica al idioma del texto).
- **Multi-tenant**: No aplica.
- **Offline**: Nice-to-have — al ser 100% client-side, podría funcionar sin conexión una vez cargada la página (no bloqueante para el MVP).

### Restricciones Conocidas

- Límite razonable de tamaño de texto (~50k caracteres) para evitar que el navegador se congele con regex sobre inputs enormes.
- Sin backend significa sin analytics de servidor — medir el KPI principal (retorno) requiere una herramienta de analytics client-side sin cookies (ver gap abajo).

### Riesgos Identificados

| Riesgo                                                               | Impacto | Mitigación                                                                                                       |
| -------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| Regex de UTM/tracking incompleta — deja pasar parámetros no estándar | Medio   | Mantener lista de params conocidos actualizable + ofrecer modo agresivo "eliminar todos los parámetros de query" |
| Rendimiento con textos muy grandes                                   | Bajo    | Límite de tamaño + regex compilada una sola vez, no en cada keystroke                                            |
| Falsos positivos/negativos en regex de emails y URLs                 | Medio   | Usar regex validadas y probadas con casos reales (incluir tests)                                                 |

---

## 9. Gaps Identificados y Recomendaciones

- **Medición del KPI principal**: no se definió herramienta de analytics. Recomendación: agregar Vercel Analytics o Plausible (sin cookies, respetuoso de la privacidad — coherente con la propuesta de valor) para poder medir tráfico y retorno.
- **Alcance de "limpiar enlaces"**: se resolvió durante la entrevista dejando dos modos — "solo params de tracking conocidos" (default, seguro) y "eliminar todos los params de query" (agresivo, opcional) — para no romper links que usan query params legítimos (ej. `?page=2`).

---

## 10. Próximos Pasos (Pipeline)

Este PDR corresponde al modo **🚀 MVP para Validar**. Los siguientes pasos son:

1. ⬜ **Tech Spec** — Stack mínimo (probablemente Next.js sin backend/DB)
2. ⬜ **User Stories** — Historias core (máx. 1-2 epics, 5-8 stories)
3. ⬜ **UI (Core Screens)** — Pantalla única funcional
4. ⬜ **Blueprint (Lean)** — Plan de construcción

---

## Nota sobre el proceso

Este PDR se generó con una entrevista abreviada (2 preguntas de clarificación en vez de la entrevista completa de 9 preguntas), dado que el Viability Check y el BMC lean previos ya habían cubierto problema, usuario, propuesta de valor y modelo de negocio. Solo se profundizó en los puntos genuinamente ambiguos: mecánica de interacción (botones independientes vs. tabs) y comportamiento del extractor (panel aparte vs. reemplazo).

---

_PDR generado con el pipeline de MVP La Herrería_
