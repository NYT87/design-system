import { useEffect, useId, useMemo, useState } from 'react';
import { checkTheme, contrast, defineTheme, type ColorOverrides } from '@nyt87/ui';
import { CodeBlock, Html } from './ui';

const DARK_TEXT = '#0e1216';
const bestOn = (accent: string) => (contrast('#ffffff', accent)! >= contrast(DARK_TEXT, accent)! ? '#ffffff' : DARK_TEXT);
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');

interface Mode { accent: string; ink: string; on: string; autoOn: boolean }

const toTokens = (m: Mode): ColorOverrides => ({ accent: m.accent, 'on-accent': m.autoOn ? bestOn(m.accent) : m.on, 'accent-ink': m.ink, ring: m.ink });

function ColorField({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  const id = useId();
  return (
    <div className="ds-field">
      <label className="ds-field__label" htmlFor={id}>{label}</label>
      <input id={id} type="color" className="color-input" value={value} onChange={(e) => onChange(e.target.value)} aria-describedby={`${id}-hint`} />
      <p className="ds-field__hint" id={`${id}-hint`}>{hint ?? value}</p>
    </div>
  );
}

export function Theming() {
  const nameId = useId();
  const [name, setName] = useState('acme');
  const [light, setLight] = useState<Mode>({ accent: '#0a5ad4', ink: '#0a5ad4', on: '#ffffff', autoOn: true });
  const [dark, setDark] = useState<Mode>({ accent: '#5aa2ff', ink: '#5aa2ff', on: '#08111c', autoOn: true });
  const [applied, setApplied] = useState(false);

  const safeName = name.toLowerCase().replace(/[^a-z0-9-]/g, '') || 'custom';
  const theme = useMemo(() => ({ light: toTokens(light), dark: toTokens(dark) }), [light, dark]);
  const failures = useMemo(() => checkTheme(theme), [theme]);
  const { css } = useMemo(() => defineTheme({ name: safeName, ...theme }), [safeName, theme]);

  // "Try on the whole site": inject the generated css and switch the accent, then undo on leave.
  useEffect(() => {
    if (!applied) return;
    const el = document.createElement('style');
    el.textContent = css;
    document.head.append(el);
    const prev = document.documentElement.dataset.accent;
    document.documentElement.dataset.accent = safeName;
    return () => {
      el.remove();
      if (prev) document.documentElement.dataset.accent = prev; else delete document.documentElement.dataset.accent;
    };
  }, [applied, css, safeName]);

  const modeFields = (title: string, m: Mode, set: (m: Mode) => void) => (
    <fieldset className="mode">
      <legend>{title}</legend>
      <ColorField label="Accent (button fill)" value={m.accent} onChange={(accent) => set({ ...m, accent })} />
      <ColorField label="Accent text (links, selected tab, focus ring)" value={m.ink} onChange={(ink) => set({ ...m, ink })} />
      <ColorField label="Text on accent" value={m.autoOn ? bestOn(m.accent) : m.on} onChange={(on) => set({ ...m, on, autoOn: false })} hint={m.autoOn ? `${bestOn(m.accent)} (picked automatically)` : m.on} />
      {!m.autoOn ? <button type="button" className="ds-btn ds-btn--ghost ds-btn--sm" onClick={() => set({ ...m, autoOn: true })}>Pick text colour automatically</button> : null}
    </fieldset>
  );

  const attrs = `light='${JSON.stringify(theme.light)}'\n  dark='${JSON.stringify(theme.dark)}'`;
  const element = `<ds-theme-scope\n  ${attrs}>\n  <!-- your page or section -->\n</ds-theme-scope>`;
  const previewHtml = `<ds-theme-scope light='${esc(JSON.stringify(theme.light))}' dark='${esc(JSON.stringify(theme.dark))}'>
    <section class="ds-card">
      <header class="ds-card__head"><h3 class="ds-card__title">Preview</h3><span class="ds-badge ds-badge--accent"><span class="ds-badge__dot" aria-hidden="true"></span>${esc(safeName)}</span></header>
      <div class="ds-card__body stack">
        <div class="row"><button class="ds-btn ds-btn--primary ds-btn--md" type="button">Primary</button><button class="ds-btn ds-btn--secondary ds-btn--md" type="button">Secondary</button><button class="ds-btn ds-btn--ghost ds-btn--md" type="button">Ghost</button></div>
        <div class="ds-tabs">
          <div role="tablist" aria-label="Preview tabs" class="ds-tabs__list">
            <button role="tab" type="button" class="ds-tabs__tab" id="pv-a" aria-controls="pv-pa" aria-selected="true">Overview</button>
            <button role="tab" type="button" class="ds-tabs__tab" id="pv-b" aria-controls="pv-pb" aria-selected="false" tabindex="-1">Activity</button>
          </div>
          <div role="tabpanel" id="pv-pa" aria-labelledby="pv-a" class="ds-tabs__panel" tabindex="0">The selected tab and the focus ring use the accent text colour.</div>
          <div role="tabpanel" id="pv-pb" aria-labelledby="pv-b" class="ds-tabs__panel" tabindex="0" hidden>Second tab.</div>
        </div>
        <p>Status colours never change, and links keep the brand link colour.</p>
      </div>
    </section>
  </ds-theme-scope>`;

  return (
    <>
      <section className="block">
        <h2>How theming works</h2>
        <p className="muted">
          Every component reads colour tokens (<code>--accent</code>, <code>--bg</code>, <code>--fg</code>…), so a theme is just new values for some of them. There are three ways to apply your own,
          from smallest to largest:
        </p>
        <ol>
          <li><strong>A section of a page:</strong> wrap it in <code>&lt;ds-theme-scope&gt;</code> (below).</li>
          <li><strong>A whole product, with no script:</strong> add the CSS generated by <code>defineTheme</code> to the app and set <code>data-accent="your-name"</code> on <code>&lt;html&gt;</code>. Built-in presets <code>green</code> and <code>blue</code> work the same way.</li>
          <li><strong>A shared product theme:</strong> <code>@nyt87/tokens/themes/gori.css</code> is the Gori theme (slate neutrals, dark first). Import it after <code>tokens.css</code> and set <code>data-accent="gori"</code>; its data is in <code>@nyt87/tokens/themes</code>.</li>
          <li><strong>One-off:</strong> override a variable in your own CSS. You lose the contrast check, so prefer the two above.</li>
        </ol>
        <p className="muted">Colours are checked against WCAG: text 4.5:1, focus ring, input borders and the accent fill 3:1. Change any token you like; the checker names the pair that fails.</p>
      </section>

      <section className="block">
        <h2>Theme builder</h2>
        <div className="builder">
          <div className="builder__form">
            <div className="ds-field">
              <label className="ds-field__label" htmlFor={nameId}>Theme name</label>
              <input id={nameId} className="ds-control" value={name} onChange={(e) => setName(e.target.value)} aria-describedby={`${nameId}-hint`} />
              <p className="ds-field__hint" id={`${nameId}-hint`}>Used as data-accent="{safeName}"</p>
            </div>
            <div className="modes">
              {modeFields('Light mode', light, setLight)}
              {modeFields('Dark mode', dark, setDark)}
            </div>
            <div aria-live="polite">
              {failures.length === 0 ? (
                <div className="ds-alert ds-alert--ok" role="status">
                  <div className="ds-alert__main"><p className="ds-alert__title">Passes contrast in light and dark</p><div className="ds-alert__body">Text on the accent, accent text, focus ring and fill all meet WCAG.</div></div>
                </div>
              ) : (
                <div className="ds-alert ds-alert--danger" role="alert">
                  <div className="ds-alert__main">
                    <p className="ds-alert__title">{failures.length} contrast problem{failures.length > 1 ? 's' : ''}</p>
                    <div className="ds-alert__body">
                      <ul className="fails">
                        {failures.map((f, i) => (
                          <li key={i}><strong>{f.mode}:</strong> <code>{f.fg}</code> {f.fgColor} on <code>{f.bg}</code> {f.bgColor} is {f.ratio}:1, needs {f.min}:1</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button type="button" className={`ds-btn ds-btn--md ${applied ? 'ds-btn--secondary' : 'ds-btn--primary'}`} onClick={() => setApplied(!applied)} aria-pressed={applied}>
              {applied ? 'Stop trying on this site' : 'Try it on this whole site'}
            </button>
          </div>

          <Html className="builder__preview" html={previewHtml} />
        </div>
      </section>

      <section className="block">
        <h2>Use it</h2>
        <h3 className="h3">For a section of a page</h3>
        <CodeBlock language="html" code={element} />
        <p className="muted small">Load it with <code>import '@nyt87/ui/theme-scope'</code> (0.6 KB plus the 1.5 KB contrast checker). It warns in the console if the colours fail contrast.</p>
        <h3 className="h3">For a whole product (no script)</h3>
        <p className="muted small">Add this CSS to the app once, then set the attribute.</p>
        <CodeBlock language="css" code={css} />
        <CodeBlock language="html" code={`<html data-accent="${safeName}">`} />
        <h3 className="h3">Generate it in a build script</h3>
        <CodeBlock
          language="js"
          code={`import { defineTheme } from '@nyt87/tokens/theme';\n\nconst { css, failures } = defineTheme({\n  name: '${safeName}',\n  light: ${JSON.stringify(theme.light)},\n  dark: ${JSON.stringify(theme.dark)},\n});\nif (failures.length) throw new Error(JSON.stringify(failures, null, 2)); // fail the build on bad contrast`}
        />
      </section>
    </>
  );
}
