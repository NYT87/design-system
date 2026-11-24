// Single source of truth. `npm run build` turns this into dist/tokens.css and dist/tokens.json.
// Base identity: the nyt87 brand (docs/brand-guidelines.md on the company site): Signal Orange, Console Teal, warm neutrals.
// The light page background is a warm white (#fdfbf8) rather than the company site's parchment (#faf4ee).
// Every colour has a light and a dark value. Names are semantic (what it is for), never literal (orange-500).

export const color = {
  light: {
    bg: '#fdfbf8',            // page (warm white)
    'bg-raised': '#ffffff',   // cards, panels, popovers
    'bg-sunken': '#f6f1eb',   // wells, code blocks, hover rows
    fg: '#191511',
    'fg-muted': '#5e574f',    // secondary text
    border: '#cfc9c4',        // decorative dividers
    'border-strong': '#857d75', // inputs, anything whose edge must be seen (>= 3:1)
    accent: '#be4500',        // fill of primary actions (Signal Orange)
    'on-accent': '#ffffff',
    'accent-ink': '#b34200',  // accent used as text, markers, selected state
    link: '#16707b',          // text links (Console Teal)
    ok: '#15803d',
    warn: '#9a4a07',
    danger: '#b91c1c',
    'on-status': '#ffffff',   // text on a solid ok/warn/danger fill
    ring: '#b34200',          // focus ring, >= 3:1 on every surface
    scrim: 'rgb(25 21 17 / 0.4)',
    shadow: 'rgb(36 24 12 / 0.12)',
    'series-1': '#86198f',
    'series-2': '#7c2d12',
    'series-3': '#0f766e',
    'series-4': '#6b6a0a',
    'series-5': '#334155',
  },
  dark: {
    bg: '#0e1216',
    'bg-raised': '#191d22',
    'bg-sunken': '#090c0f',
    fg: '#efebe4',
    'fg-muted': '#b9b3aa',
    border: '#424850',
    'border-strong': '#6b727a',
    accent: '#be4500',
    'on-accent': '#ffffff',
    'accent-ink': '#f88f4f',
    link: '#65c1cf',
    ok: '#4ade80',
    warn: '#fbbf24',
    danger: '#f87171',
    'on-status': '#0e1216',
    ring: '#f47f46',
    scrim: 'rgb(0 0 0 / 0.6)',
    shadow: 'rgb(0 0 0 / 0.5)',
    'series-1': '#f0abfc',
    'series-2': '#d99a6c',
    'series-3': '#5eead4',
    'series-4': '#bef264',
    'series-5': '#cbd5e1',
  },
};

// Built-in presets, selected with <html data-accent="green">. They only override what they list.
// Custom ones: see theme.mjs (defineTheme) and the Theming page of the docs.
export const accents = {
  green: {
    light: { accent: '#15803d', 'on-accent': '#ffffff', 'accent-ink': '#166534', ring: '#166534' },
    dark: { accent: '#22c55e', 'on-accent': '#052e16', 'accent-ink': '#4ade80', ring: '#4ade80' },
  },
  blue: {
    light: { accent: '#1668c4', 'on-accent': '#ffffff', 'accent-ink': '#1668c4', ring: '#1668c4' },
    dark: { accent: '#4aa3ff', 'on-accent': '#08111c', 'accent-ink': '#4aa3ff', ring: '#4aa3ff' },
  },
};

// Theme-independent tokens.
export const base = {
  'font-heading': "'Space Grotesk', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  'font-sans': "'Manrope', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  'font-mono': "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  'weight-heading': '500',
  'tracking-heading': '-0.03em',
  'text-xs': '0.75rem',
  'text-sm': '0.875rem',
  'text-md': '1rem',
  'text-lg': '1.125rem',
  'text-xl': '1.25rem',
  'text-2xl': '1.5rem',
  'text-3xl': '1.875rem',
  'text-4xl': '2.25rem',
  'leading-tight': '1.1',
  'leading-normal': '1.6',
  'space-1': '0.25rem',
  'space-2': '0.5rem',
  'space-3': '0.75rem',
  'space-4': '1rem',
  'space-5': '1.5rem',
  'space-6': '2rem',
  'space-7': '3rem',
  'space-8': '4rem',
  'radius-sm': '8px',
  'radius-md': '12px',
  'radius-lg': '18px',
  'radius-full': '9999px',
  'shadow-sm': '0 1px 2px var(--shadow)',
  'shadow-md': '0 8px 24px var(--shadow)',
  'duration-fast': '120ms',
  'duration-base': '200ms',
  ease: 'cubic-bezier(0.2, 0, 0, 1)',
  'tap-min': '44px',
  'nav-height': '4.5rem',
  'max-width': '70rem',
  'page-gutter': 'clamp(1rem, 3vw, 1.5rem)',
};
