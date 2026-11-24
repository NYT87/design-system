import { useState } from 'react';
import { cx } from '../cx';

export interface CodeBlockProps {
  code: string;
  /** Shown as a small tag, e.g. "tsx". */
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard blocked: leave the button as is */ }
  };
  return (
    <div className={cx('ds-code', className)}>
      <div className="ds-code__bar">
        <span className="ds-code__lang">{language}</span>
        <button type="button" className="ds-code__copy" onClick={copy} aria-live="polite">{copied ? 'Copied' : 'Copy'}</button>
      </div>
      <pre tabIndex={0}><code>{code}</code></pre>
    </div>
  );
}
