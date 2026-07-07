# VIABILITY-limpiador-de-textos

> Análisis de viabilidad generado por Forge · 2026-07-07

## Resumen Ejecutivo

**Idea:** Herramienta web gratuita para limpiar texto pegado — quita espacios dobles, elimina parámetros de tracking de URLs (utm_*), convierte mayúsculas/minúsculas, y extrae emails/links de un bloque de texto.
**Veredicto:** 🟡 CAUTION (muy cerca de GO)
**Score:** 3.86 / 5.0
**Ruta recomendada:** 🚀 MVP para Validar

---

## Análisis por Dimensión

### Viabilidad Técnica: 5/5

- **Golden Path Fit:** Total. Es lógica 100% client-side (regex/string manipulation) — ni siquiera requiere Supabase para el MVP. Se puede construir solo con Next.js + un poco de JS.
- **APIs Externas:** Ninguna necesaria. Cero dependencias externas, cero puntos de falla.
- **Complejidad:** Muy baja. 4 micro-features (limpiar espacios, limpiar UTM, case converter, extractor de emails/links), cada una es una función pura.
- **Datos:** No requiere datos externos ni persistencia para funcionar.

### Viabilidad de Negocio: 3.3/5

- **Problema:** Real pero de baja intensidad — es una "micro-molestia" recurrente, no un dolor agudo. La gente lo resuelve hoy con find&replace manual, otras herramientas sueltas, o simplemente ignorando el ruido.
- **Mercado:** Difuso. "Cualquiera que copia y pega texto o links" es un segmento enorme pero no direccionable — no hay un canal obvio para llegar a "todos".
- **Monetización:** Elegiste freemium a futuro, pero para una utilidad de este tipo el techo de disposición a pagar es bajo. El camino realista es: gratis + tráfico → features premium tipo batch processing, API, o guardar historial/plantillas de limpieza.
- **Diferenciación:** Ya existen decenas de herramientas sueltas para cada sub-función (UTM stripper, case converter, email extractor) por separado. La diferenciación viable es la agregación: "todo en una sola pantalla, sin fricción, sin anuncios invasivos" — no una feature única sino la ejecución.

### Viabilidad de Marketing: 3.45/5

- **Canal de adquisición:** SEO de long-tail ("remove utm from url", "convertir mayusculas a minusculas online", "extraer emails de texto") es plausible pero es un espacio competido con herramientas ya posicionadas desde hace años.
- **Explicabilidad:** Excelente — se entiende en menos de 5 segundos: pegas texto, click, resultado limpio.
- **Timing:** Neutro. Es una utilidad atemporal, sin un driver de "por qué ahora".
- **Viral potential:** Bajo. Es del tipo "se guarda en marcadores", no del tipo "se comparte con amigos".

---

## Riesgos Identificados

| #   | Riesgo                                                                     | Probabilidad | Impacto | Mitigación                                                                                                                                                                                     |
| --- | -------------------------------------------------------------------------- | ------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Competencia ya posicionada en SEO para cada sub-función individual         | Alta         | Medio   | No competir función por función — posicionar como "la navaja suiza" (todo en un lugar) y apostar por UX superior + velocidad                                                                   |
| 2   | Bajo potencial de monetización directa de una utilidad simple              | Alta         | Medio   | Tratar la v1 como gratis-sin-fricción; validar tráfico/uso real antes de diseñar el freemium; posibles vías: donaciones, ads no invasivos, o features premium (batch/API) solo si hay tracción |
| 3   | Sin canal de adquisición pagado obvio, dependencia de SEO orgánico (lento) | Media        | Alto    | Lanzar ya con SEO on-page cuidado desde el día 1 (títulos, meta, schema) y compartir en comunidades relevantes (r/webdev, Product Hunt, Indie Hackers) para tracción inicial                   |
| 4   | Feature creep — la tentación de agregar "una función más" sin fin          | Media        | Bajo    | El PDR fija scope estricto: máximo 3-4 transformaciones core para la v1                                                                                                                        |

---

## Recomendación

La idea es técnicamente trivial de construir (score 5/5) — el riesgo no está en "si se puede construir" sino en si genera tracción suficiente para justificar tiempo más allá del fin de semana. Es el perfil clásico de "utilidad de nicho, bajo dolor, sin canal viral": vale la pena construirla porque el costo es bajísimo (unas horas, sin infraestructura), pero no hay que sobre-invertir en monetización antes de validar que la gente realmente la usa. Score 3.86 lo pone en CAUTION, empujado hacia abajo por Negocio (mercado difuso, monetización incierta) — exactamente el patrón que el modo MVP está diseñado para resolver: construir rápido y barato, y usar uso real (no encuestas) como señal de validación.

### Si CAUTION → Qué validar primero

1. Lanzar la v1 gratis sin fricción (sin login) y medir tráfico orgánico + retorno de usuarios (¿vuelven las 3 veces al día que promete la propuesta de valor?)
2. Publicar en 1-2 comunidades (Product Hunt, r/webdev, Indie Hackers) y observar si genera pull orgánico o silencio total
3. Antes de invertir en features premium, confirmar que existe uso recurrente — si nadie vuelve, el freemium no tiene base

### Siguiente paso

Proceder con **Step 1 (BMC lean)** del pipeline 🚀 MVP para Validar.
