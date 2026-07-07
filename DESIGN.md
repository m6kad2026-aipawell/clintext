# Design System: Clintext (Limpiador de Textos y Enlaces)

## 1. Visual Theme & Atmosphere

**Editorial de sala de redacción.** La herramienta se siente como el escritorio de un
corrector de estilo: papel cálido, tinta de verdad, marcas de corrección visibles.
El texto sucio se trata como un borrador lleno de tachones rojos; el texto limpio,
como una página ya corregida en tinta verde. La estética conecta directamente con
la función del producto — no es decoración gratuita, es la metáfora del negocio
hecha visual.

**Key Characteristics:**

- Fondo cálido tipo papel, nunca blanco puro ni gris SaaS
- Tipografía serif con carácter para títulos, monoespaciada para las áreas de texto (el texto ES el producto)
- Lenguaje visual de corrector: rojo para "sucio/antes", verde tinta para "limpio/después"
- Superficies tipo "hoja de papel" — bordes finos, sombra cálida y suave, nunca sombra gris genérica
- Densidad moderada, mucho aire — es una herramienta de una sola tarea, no un dashboard

---

## 2. Color Palette & Roles

### Primary Foundation

- **Warm Newsprint** (#F3EEE2) — Fondo principal de la página. Evoca papel de periódico envejecido, cálido, nunca clínico.
- **Page Cream** (#FAF7F0) — Fondo de las superficies tipo "hoja" (textarea, panel de extracción). Ligeramente más claro que el fondo para dar sensación de página elevada.
- **Deep Ink** (#1C1A17) — Texto principal y botones primarios. Negro cálido, nunca #000 puro.

### Accent & Interactive

- **Editor's Red** (#C1401F) — El color de "lo sucio": marcas de corrección, subrayado decorativo del título, estado antes-de-limpiar. Usado con moderación, nunca como fondo grande.
- **Fresh Ink Green** (#1F6E4A) — El color de "lo limpio": confirmaciones, toast de "Copiado", checkmarks. Es el color de la recompensa — aparece SOLO después de una acción exitosa.
- **Carbon Blue** (#2A4B6B) — Acento secundario para enlaces y el botón de "Limpiar enlaces" (conecta visualmente con la idea de URL).

### Typography & Text Hierarchy

- **Deep Ink** (#1C1A17) — Texto primario
- **Faded Ink** (#6B6255) — Texto secundario, ayudas, placeholders
- **Faded Rule** (#D8CFBC) — Bordes, divisores, líneas de regla

### Functional States

- **Success:** Fresh Ink Green (#1F6E4A)
- **Error:** Editor's Red (#C1401F)
- **Warning:** Ochre Flag (#A6741C) — para avisos tipo "texto muy largo"
- **Info:** Carbon Blue (#2A4B6B)

> Todos los colores están tinteados hacia un hue cálido (papel/tinta), incluyendo los
> neutrales. No se usa gris frío ni negro/blanco puros en ninguna superficie.

---

## 3. Typography Rules

**Display Font:** Fraunces — serif editorial con carácter fuerte, ejes ópticos "wonky"
que le dan personalidad de máquina de escribir de imprenta antigua. Usado en títulos
y en el logotipo textual del producto.

**Body/UI Font:** Instrument Sans — grotesk contemporáneo con calidez, usado en
labels, botones y texto de interfaz que no es "el texto del usuario".

**Mono Font:** IBM Plex Mono — usado EXCLUSIVAMENTE en las áreas donde vive el texto
del usuario (textarea principal, panel de extracción). Refuerza que ahí es donde
ocurre el trabajo real, como una máquina de escribir o terminal de corrector.

### Hierarchy & Weights

- **Display (H1):** Fraunces, 600, clamp(2rem, 4vw, 3.25rem), letter-spacing -0.01em
- **Section Headers (H2):** Fraunces, 500, 1.5rem
- **Subsection (H3):** Instrument Sans, 600, 1rem, uppercase, letter-spacing 0.04em (estilo "kicker" de artículo editorial)
- **Body:** Instrument Sans, 400, 1rem, line-height 1.6
- **Text Areas (contenido del usuario):** IBM Plex Mono, 400, 0.95rem, line-height 1.7
- **Small/Meta:** Instrument Sans, 500, 0.8rem
- **CTA Buttons:** Instrument Sans, 600, 0.95rem, letter-spacing 0.01em

### Spacing Principles

- Vertical rhythm basado en múltiplos de 8px
- Line-height generoso en textareas (1.7) para legibilidad de texto denso pegado por el usuario

> NUNCA Inter, Roboto, Arial o system-ui como fuente principal.

---

## 4. Component Stylings

### Buttons

- **Shape:** Esquinas apenas redondeadas (4px) — evocan una etiqueta o sello de papel, no un botón de app móvil
- **Primary (Copiar):** Fondo Deep Ink, texto Page Cream. Al presionar, se desplaza 1px hacia abajo y pierde sombra — efecto de "sello presionándose contra el papel"
- **Secondary (transformaciones — Limpiar espacios, Case, etc.):** Fondo Page Cream, borde 1.5px Deep Ink, texto Deep Ink. Al hover, fondo pasa a Deep Ink con transición de 150ms
- **Acento por función:** el botón "Limpiar enlaces" usa borde Carbon Blue en vez de Deep Ink — asocia el color al tipo de dato que procesa
- **Disabled:** opacidad 40%, cursor not-allowed, sin hover

### Cards & Containers

- **Corners:** 6px — sutil, como una hoja de papel con esquinas cortadas a máquina, no un componente de UI redondeado
- **Background:** Page Cream sobre Warm Newsprint — la superficie se "eleva" del fondo por contraste tonal, no por sombra dura
- **Shadow:** Sombra cálida y difusa (`0 8px 24px -12px rgba(28, 26, 23, 0.18)`), nunca gris fría
- **Borde:** 1px Faded Rule — como la línea de una hoja rayada

### Navigation

No hay navegación multi-página en el MVP — una sola pantalla. El "header" es
mínimo: un ícono de marca (pluma/checkmark estilizado) + nombre del producto en Fraunces,
sin menú.

### Inputs & Forms (Textarea principal)

- **Stroke:** 1.5px Faded Rule, pasa a Deep Ink al focus
- **Background:** Page Cream
- **Focus:** Anillo de foco sutil en Carbon Blue (2px, offset 2px) — accesible, no genérico azul Tailwind
- **Estado "recién limpiado":** un pulso breve de borde en Fresh Ink Green (400ms) para confirmar visualmente que la transformación ocurrió
- **Panel de extracción:** se conecta al textarea principal con un borde superior en estilo "perforado" (línea punteada, como el borde de un cupón que se separa) — refuerza la metáfora de "extraer/separar" datos del texto

---

## 5. Layout Principles

### Grid & Structure

- **Max width:** 760px — ancho de página de documento, no de dashboard
- **Grid:** Columna única centrada; el panel de extracción aparece debajo del textarea principal, no al costado (mobile-first, sin layouts de 2 columnas que compliquen responsive)
- **Breakpoints:** Mobile (<640px), Desktop (≥640px)

### Whitespace Strategy

- **Base unit:** 8px
- **Section margins:** generosos (48-64px) entre header, toolbar y área de trabajo
- **Edge padding:** 20px mobile, 0 desktop (contenido centrado con max-width)

### Alignment

- **Text:** Header centrado; el resto (toolbar, textarea, resultados) alineado a la izquierda como un documento de trabajo
- **Touch targets:** Mínimo 44x44px en todos los botones

---

## 6. Motion & Animation

### Philosophy

El motion confirma que "algo se limpió" — es feedback funcional con carácter, no
decoración. Cada transformación exitosa se siente como un trazo de tinta que se asienta.

### Timing & Easing

- **Micro-interactions (botones, hover):** 150ms, ease-out
- **Confirmación de limpieza (pulso de borde):** 400ms, ease-out-quart
- **Toast de copiado:** entra con scale 0.95→1 + opacity, 200ms ease-out-back sutil; sale con fade 150ms tras 2s
- **Carga inicial de página:** stagger de 80ms entre header → toolbar → textarea (un solo reveal orquestado, no animaciones dispersas)

### Rules

- Solo se anima `transform` y `opacity`
- Respeta `prefers-reduced-motion`: sin stagger ni scale, solo fades instantáneos
- Easing exponencial preferido, nunca "bounce" arbitrario

---

## 7. Anti-AI-Slop Markers

### Patrones Prohibidos

- [ ] NO Inter/Roboto/Arial/system-ui como fuente
- [ ] NO gradiente morado sobre blanco
- [ ] NO azul #3B82F6 (default Tailwind) como color primario
- [ ] NO cards blancas con sombra gris genérica sin personalidad
- [ ] NO paleta "segura" de grises equidistantes con un solo accent tímido

### El Test

Si alguien viera esta pantalla y dijera "la hizo una IA con shadcn default",
no debería tener razón: la combinación papel cálido + serif editorial + mono
para texto + código de color rojo/verde de corrector no aparece en el template
genérico de ningún generador.

### Diferenciador Visual

El código de color rojo→verde de "corrector editorial" aplicado consistentemente:
el título tiene un subrayado rojo decorativo tipo tachón, y cada transformación
exitosa dispara un pulso verde en el borde del textarea. Es el detalle que
alguien va a recordar: "la herramienta que se siente como si un editor de verdad
estuviera corrigiendo mi texto".

---

## 8. Design System Notes for Generation

### Lenguaje Descriptivo

- **Atmósfera:** "El escritorio cálido de un corrector de estilo — papel, tinta roja y tinta verde"
- **Buttons:** "Botones como sellos de papel — planos, con borde de tinta, que se presionan levemente al hacer click"
- **Shadows:** "Sombra de página elevada, cálida y difusa — nunca gris fría"
- **Spacing:** "Aire generoso entre secciones, como el margen de una página de revista"

### Color References

- Background: "Warm Newsprint (#F3EEE2)"
- Surface: "Page Cream (#FAF7F0)"
- Primary text/buttons: "Deep Ink (#1C1A17)"
- Dirty/before accent: "Editor's Red (#C1401F)"
- Clean/success accent: "Fresh Ink Green (#1F6E4A)"
- Links/URL accent: "Carbon Blue (#2A4B6B)"

### Component Prompts

- "Header con logotipo de pluma/checkmark + 'Limpiador de Textos' en Fraunces 600, con un subrayado rojo tipo tachón de corrector debajo de la palabra clave"
- "Textarea principal como hoja de papel Page Cream, borde Faded Rule, fuente IBM Plex Mono, que pulsa en verde 400ms cuando se aplica una limpieza"
- "Panel de extracción conectado por un borde punteado tipo cupón perforado, con dos columnas apiladas (emails / links) en mobile"
