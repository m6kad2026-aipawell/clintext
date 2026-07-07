# UI — Limpiador de Textos y Enlaces

> Documentación interna del Design System y pantallas implementadas.
> Ver `DESIGN.md` (root) para el design system portable completo.

## Pantallas Implementadas

### Pantalla única: Herramienta Principal (`/`)

La única pantalla del MVP — no hay navegación multi-página (ver Tech Spec: sin auth, sin rutas protegidas).

**Estructura:**

1. Header — logotipo + nombre del producto, subrayado editorial rojo
2. Textarea principal — donde el usuario pega el texto
3. Toolbar de transformaciones — botones: Limpiar espacios / Limpiar enlaces (+ toggle modo agresivo) / Mayús-minús (4 sub-opciones) / Extraer emails y links
4. Botón "Copiar" — flotante junto al textarea
5. Panel de extracción (condicional) — aparece solo tras usar "Extraer emails y links"
6. Footer mínimo — nota de privacidad ("Todo se procesa en tu navegador, nada se sube a un servidor")

**Estados cubiertos:**

| Estado                       | Comportamiento                                                                            |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| Default / vacío              | Textarea vacío, botones de acción deshabilitados, placeholder invita a pegar texto        |
| Con texto                    | Botones habilitados                                                                       |
| Post-transformación          | Texto actualizado in-place + pulso de borde verde (400ms)                                 |
| Post-extracción              | Panel de resultados aparece debajo con borde punteado, columnas Emails/Links              |
| Extracción sin resultados    | Mensaje "No se encontraron emails ni enlaces en este texto"                               |
| Copiado exitoso              | Toast "Copiado al portapapeles" (Fresh Ink Green), desaparece a los 2s                    |
| Clipboard no disponible      | Fallback de selección + mensaje alternativo                                               |
| Texto muy largo (>50k chars) | Aviso Ochre Flag "Texto muy largo — puede tardar un poco más", la acción igual se ejecuta |

**Acceptance targets (de USER-STORIES-limpiador-de-textos.md):**

- US-001 a US-006 cubiertos por esta única pantalla — ver criterios detallados en el archivo de user stories
- Transformaciones se sienten instantáneas (<300ms percibido)
- Todos los botones cumplen mínimo 44x44px de touch target

## Componentes Nuevos (`src/shared/ui/`)

Reutilizan primitivas de shadcn/ui (Button, Textarea, Toast) pero con el theming
del Design System aplicado vía tokens CSS — no son shadcn defaults visualmente.

- `Button` (variantes: primary/stamp, secondary/outline, accent-blue) — estilizado según DESIGN.md §4
- `Textarea` — con soporte de pulso de borde por prop `justCleaned`
- `Toast` — reutiliza sonner/shadcn toast, estilizado en Fresh Ink Green

## Componentes de Feature (`src/features/text-cleaner/components/`)

- `TextCleanerTool.tsx` — contenedor, dueño del estado
- `CleanerToolbar.tsx` — botones de transformación + toggles
- `ExtractPanel.tsx` — panel de resultados de extracción
- `CopyButton.tsx` — botón de copiar con manejo de fallback y toast
