# @nyt87/tokens

Shared design tokens for all projects, as CSS custom properties. Source of truth: `src/tokens.mjs`. Rules: `DESIGN.md`. Visual check: the docs site (`npm run dev` at the repo root).

```
npm run build   # dist/tokens.css + dist/tokens.json
npm test        # WCAG contrast for every theme and accent
```

## Adopting in a project
1. Link it: `pnpm add ../design-system` (or `npm i ../design-system`).
2. Import once at the app root, before the app CSS: `@import "@nyt87/tokens/tokens.css";`
3. Replace local colour, radius and font variables with the shared names. Rename map for existing projects:

| Shared | bongsu | opentrack-viewer | gori |
|---|---|---|---|
| `--bg` | `--bg` | `--bg` | `--color-background` |
| `--bg-raised` | `--card` | `--bg-raised` | `--color-card` |
| `--bg-sunken` | – | `--bg-sunken` | `--color-muted` |
| `--fg` | `--fg` | `--text` | `--color-foreground` |
| `--fg-muted` | `--muted` | `--text-muted` | `--color-muted-foreground` |
| `--border` | `--line` | `--border` | `--color-border` |
| `--border-strong` | – | – | `--color-input-border` |
| `--accent-ink` | `--accent-ink` | `--accent` (text uses) | `--color-accent-text` |
| `--link` | – | – | – (new: Console Teal) |
| `--danger` | `--bad` | `--error` | `--color-destructive` |
| `--on-status` | `--on-warn` | – | – |

Next steps once adopted in two or more projects: extract duplicated components into `@nyt87/ui`.

## Custom themes
```js
import { defineTheme, checkTheme } from '@nyt87/tokens/theme';
const { css, failures } = defineTheme({ name: 'acme', light: { accent: '#0a5ad4' }, dark: { accent: '#5aa2ff', 'on-accent': '#08111c' } });
```
Add `css` to the app and set `<html data-accent="acme">`. `failures` lists any pair below WCAG. Fonts are not bundled in the CSS: load Space Grotesk, Manrope and JetBrains Mono yourself (the docs site self-hosts them with `@fontsource-variable/*`); the stacks fall back to system fonts.
