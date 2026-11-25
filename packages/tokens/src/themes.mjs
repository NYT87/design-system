// Named product themes shared across nyt87 products. Each is a set of token overrides applied with <html data-accent="name">.
// The accent family is deliberately not overridden: buttons, links and the focus ring stay nyt87 orange.
// scripts/build.mjs emits dist/themes/<name>.css for each one and fails if a pair drops below WCAG contrast.

/** Gori: slate neutrals, dark first. Green stays for success states (--ok). */
export const gori = {
  name: 'gori',
  dark: {
    bg: '#020617', 'bg-raised': '#0e1223', 'bg-sunken': '#1a1e2f',
    fg: '#f8fafc', 'fg-muted': '#94a3b8',
    border: '#334155', 'border-strong': '#64748b',
    warn: '#f59e0b', shadow: 'rgb(0 0 0 / 0.45)',
  },
  light: {
    bg: '#ffffff', 'bg-raised': '#f8fafc', 'bg-sunken': '#f1f5f9',
    fg: '#0f172a', 'fg-muted': '#475569',
    border: '#e2e8f0', 'border-strong': '#64748b',
    warn: '#b45309', shadow: 'rgb(15 23 42 / 0.12)',
  },
};

export const themes = { gori };
