// Custom themes: generate CSS for any subset of colour tokens, and check it still meets WCAG.
// Pure JS with no dependencies, so it runs in Node (build scripts, tests) and in the browser (<ds-theme-scope>, theme builder).
import { color } from './tokens.mjs';

export const COLOR_TOKENS = Object.keys(color.light);

const decl = (obj, indent) => Object.entries(obj).map(([k, v]) => `${indent}--${k}: ${v};`).join('\n');
const block = (selector, obj, indent = '') => `${indent}${selector} {\n${decl(obj, indent + '  ')}\n${indent}}`;

/**
 * CSS that applies `light` and `dark` overrides. Pass only the tokens you change; the rest keep their base values.
 * Dark follows the OS unless data-theme="light" is forced on <html>, and applies unconditionally for data-theme="dark",
 * the same rules as the base tokens.
 *   on: 'root'  -> `selector` matches <html> itself, e.g. ":root[data-accent='acme']"
 *   on: 'scope' -> `selector` matches an element inside the page, e.g. ".acme-theme" (what <ds-theme-scope> uses)
 */
export function themeCss(selector, { light = {}, dark = {} } = {}, { on = 'root' } = {}) {
  const osDark = on === 'root' ? `${selector}:not([data-theme='light'])` : `:root:not([data-theme='light']) ${selector}`;
  const forcedDark = on === 'root' ? `${selector}[data-theme='dark']` : `:root[data-theme='dark'] ${selector}`;
  const parts = [];
  if (Object.keys(light).length) parts.push(block(selector, light));
  if (Object.keys(dark).length) {
    parts.push(`@media (prefers-color-scheme: dark) {\n${block(osDark, dark, '  ')}\n}`);
    parts.push(block(forcedDark, dark));
  }
  return parts.join('\n');
}

// ---- contrast ----
const hex = (c) => {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(c.trim());
  if (!m) return null;
  const h = m[1].length === 3 ? [...m[1]].map((x) => x + x).join('') : m[1];
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
const lum = ([r, g, b]) => {
  const [R, G, B] = [r, g, b].map((v) => v / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};
/** WCAG contrast ratio of two #rrggbb colours, or null if either is not a hex colour. */
export function contrast(a, b) {
  const x = hex(a), y = hex(b);
  if (!x || !y) return null;
  const [hi, lo] = [lum(x), lum(y)].sort((p, q) => q - p);
  return (hi + 0.05) / (lo + 0.05);
}

/** [foreground, background, minimum ratio, what it is]. The rules every theme must satisfy. */
export const RULES = [
  ['fg', 'bg', 4.5], ['fg', 'bg-raised', 4.5], ['fg', 'bg-sunken', 4.5],
  ['fg-muted', 'bg', 4.5], ['fg-muted', 'bg-raised', 4.5], ['fg-muted', 'bg-sunken', 4.5],
  ['accent-ink', 'bg', 4.5], ['accent-ink', 'bg-raised', 4.5], ['accent-ink', 'bg-sunken', 4.5],
  ['link', 'bg', 4.5], ['link', 'bg-raised', 4.5], ['link', 'bg-sunken', 4.5],
  ['on-accent', 'accent', 4.5],
  ['ok', 'bg', 4.5], ['ok', 'bg-raised', 4.5],
  ['warn', 'bg', 4.5], ['warn', 'bg-raised', 4.5],
  ['danger', 'bg', 4.5], ['danger', 'bg-raised', 4.5],
  ['on-status', 'ok', 4.5], ['on-status', 'warn', 4.5], ['on-status', 'danger', 4.5],
  ['border-strong', 'bg', 3], ['border-strong', 'bg-raised', 3],
  ['ring', 'bg', 3], ['ring', 'bg-raised', 3], ['ring', 'bg-sunken', 3],
  ['accent', 'bg', 3], ['accent', 'bg-raised', 3],
  ...[1, 2, 3, 4, 5].map((n) => [`series-${n}`, 'bg-raised', 3]),
];

/**
 * Check a theme (partial overrides allowed, merged over the base) for both modes.
 * Returns the failing pairs: [] means the theme is accessible. Colours that are not #hex are skipped (cannot be measured).
 */
export function checkTheme({ light = {}, dark = {} } = {}, preset = color) {
  const failures = [];
  for (const [mode, over] of [['light', light], ['dark', dark]]) {
    const t = { ...preset[mode], ...over };
    for (const [fg, bg, min] of RULES) {
      const r = contrast(t[fg], t[bg]);
      if (r !== null && r < min) failures.push({ mode, fg, bg, ratio: Math.round(r * 100) / 100, min, fgColor: t[fg], bgColor: t[bg] });
    }
  }
  return failures;
}

/** Throws if `overrides` use a token name that does not exist (catches typos like "accnet"). */
export function assertKnownTokens(overrides) {
  for (const mode of ['light', 'dark']) for (const k of Object.keys(overrides[mode] ?? {})) {
    if (!COLOR_TOKENS.includes(k)) throw new Error(`Unknown colour token "${k}" in ${mode}. Known: ${COLOR_TOKENS.join(', ')}`);
  }
}

/**
 * One call for a custom theme: validates names, checks contrast, returns the CSS and any failures.
 *   const { css, failures } = defineTheme({ name: 'acme', light: { accent: '#0a6cff' }, dark: { accent: '#5aa2ff' } });
 * Apply with <html data-accent="acme"> after adding the css to your page.
 */
export function defineTheme({ name, attribute = 'accent', light = {}, dark = {} }) {
  assertKnownTokens({ light, dark });
  return {
    css: themeCss(`:root[data-${attribute}='${name}']`, { light, dark }),
    failures: checkTheme({ light, dark }),
  };
}
