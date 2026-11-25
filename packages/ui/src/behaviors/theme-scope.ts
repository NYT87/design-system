// <ds-theme-scope light='{"accent":"#0a5ad4"}' dark='{"accent":"#5aa2ff","on-accent":"#08111c"}'>...</ds-theme-scope>
// Re-colours everything inside it in light and dark mode. Only list the tokens you change.
// Warns in the console when the colours fail WCAG contrast; unknown token names throw.
import { assertKnownTokens, checkTheme, themeCss, type ColorOverrides } from '@nyt87/tokens/theme';

let n = 0;
const parse = (v: string | null): ColorOverrides => (v ? JSON.parse(v) : {});

export class DsThemeScope extends HTMLElement {
  static observedAttributes = ['light', 'dark'];
  #style = document.createElement('style');
  #id = `ds-scope-${++n}`;

  connectedCallback() {
    this.style.display = 'contents'; // transparent to layout; custom properties still inherit
    this.classList.add(this.#id);
    this.prepend(this.#style);
    this.#apply();
  }
  attributeChangedCallback() {
    if (this.isConnected) this.#apply();
  }
  #apply() {
    const theme = { light: parse(this.getAttribute('light')), dark: parse(this.getAttribute('dark')) };
    assertKnownTokens(theme);
    this.#style.textContent = themeCss(`.${this.#id}`, theme, { on: 'scope' });
    const failures = checkTheme(theme);
    if (failures.length) {
      console.warn('[@nyt87/ui] <ds-theme-scope> fails WCAG contrast:\n' + failures.map((f) => `  ${f.mode}: ${f.fg} ${f.fgColor} on ${f.bg} ${f.bgColor} = ${f.ratio}:1 (needs ${f.min}:1)`).join('\n'));
      this.dispatchEvent(new CustomEvent('ds-contrast-failures', { bubbles: true, detail: { failures } }));
    }
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('ds-theme-scope')) customElements.define('ds-theme-scope', DsThemeScope);
