import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../cx';

export interface TabItem { id: string; label: ReactNode; content: ReactNode }

export interface TabsProps {
  label: string;
  tabs: TabItem[];
  /** Uncontrolled initial tab. */
  defaultId?: string;
  value?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function Tabs({ label, tabs, defaultId, value, onChange, className }: TabsProps) {
  const base = useId();
  const [inner, setInner] = useState(defaultId ?? tabs[0]?.id);
  const current = value ?? inner;
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const select = (id: string, focus = false) => {
    setInner(id);
    onChange?.(id);
    if (focus) refs.current[id]?.focus();
  };

  const onKey = (e: KeyboardEvent, i: number) => {
    const last = tabs.length - 1;
    const next = e.key === 'ArrowRight' ? (i === last ? 0 : i + 1)
      : e.key === 'ArrowLeft' ? (i === 0 ? last : i - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last : -1;
    if (next < 0) return;
    e.preventDefault();
    select(tabs[next].id, true);
  };

  return (
    <div className={cx('ds-tabs', className)}>
      <div role="tablist" aria-label={label} className="ds-tabs__list">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { refs.current[t.id] = el; }}
            role="tab"
            type="button"
            id={`${base}-tab-${t.id}`}
            aria-controls={`${base}-panel-${t.id}`}
            aria-selected={t.id === current}
            tabIndex={t.id === current ? 0 : -1}
            className="ds-tabs__tab"
            onClick={() => select(t.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${base}-panel-${t.id}`}
          aria-labelledby={`${base}-tab-${t.id}`}
          hidden={t.id !== current}
          tabIndex={0}
          className="ds-tabs__panel"
        >
          {t.id === current ? t.content : null}
        </div>
      ))}
    </div>
  );
}
