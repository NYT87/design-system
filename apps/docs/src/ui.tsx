// Small helpers for the docs site itself. The components being documented are plain HTML and CSS.

/** A code block in the design system's own markup; the copy button works through the data-ds-copy behaviour. */
export function CodeBlock({ code, language }: { code: string; language: string }) {
  return (
    <div className="ds-code">
      <div className="ds-code__bar">
        <span className="ds-code__lang">{language}</span>
        <button type="button" className="ds-code__copy" data-ds-copy>Copy</button>
      </div>
      <pre tabIndex={0}><code>{code}</code></pre>
    </div>
  );
}

/** Renders an HTML snippet as-is. React leaves it alone between renders, so interactive state (a selected tab) survives. */
export function Html({ html, className }: { html: string; className?: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
