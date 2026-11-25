# Company design language

Applies to every product. A project's own `DESIGN.md` may only add rules, or override the accent. It must not redefine the tokens below.

## Principles
1. **Tool, not brochure.** Show real data, IDs and states. Precision beats decoration.
2. **One accent per product.** Accent means "primary action / connected / go". Status colours (`ok`, `warn`, `danger`) are never used as decoration.
3. **Both themes are first-class.** Every colour has a light and a dark value. Dark follows the OS; `data-theme` forces one.
4. **Accessible by construction.** `npm test` checks WCAG contrast for every text/background pair in all theme + accent combinations. A token change that fails the test does not ship.
5. **As little JavaScript as possible.** Components are HTML and CSS with native elements; a script only where the platform has no answer, each a few hundred bytes and framework-free.
6. **Identifiers are monospace and never translated** (`--font-mono`).

## Using tokens
- Reference tokens only (`var(--bg-raised)`), never hex values, in app CSS.
- Text on a surface: `--fg` or `--fg-muted`. Links and accent text: `--accent-ink`. Accent as a fill: `--accent` with `--on-accent` text.
- Edges the user must see (inputs, focusable containers): `--border-strong`. Decorative dividers: `--border`.
- Chart series: `--series-1..5`, each 3:1 on `--bg-raised`. Do not use status colours as series.
- Focus: `outline: 2px solid var(--ring); outline-offset: 2px` on `:focus-visible`. Touch targets at least `--tap-min`.
- Spacing from `--space-*`, corners from `--radius-*`, type from `--text-*`.

## Brand and accent
The base identity is the nyt87 brand: warm-white (light) and graphite (dark) surfaces, Signal Orange for actions and emphasis, Console Teal for links, Space Grotesk for headings and buttons, Manrope for body text, JetBrains Mono for identifiers. Where the brand guideline's focus ring (`#f47f46`) is below 3:1 on the light background, `--ring` uses the darker orange in light mode.

A product may change the accent family only (`accent`, `on-accent`, `accent-ink`, `ring`): set `<html data-accent="green">` (built-in presets: `green`, `blue`) or define its own with `defineTheme` (see the Theming page). Surfaces, text, links and status colours stay the same so products still read as one family.

## Custom themes
- **A section:** `<ds-theme-scope light='{"accent":"#0a5ad4"}' dark='{...}'>` (needs `@nyt87/ui/theme-scope`).
- **A product:** generate CSS with `defineTheme({ name, light, dark })` and set `data-accent="name"`. Fail the build if `failures` is not empty.
- Both validate names and WCAG contrast with the same rules as the built-in themes. Never override tokens with hex values in component CSS.

## Changing tokens
Edit `src/tokens.mjs`, run `npm test && npm run build`, bump the version. Never edit `dist/`.
