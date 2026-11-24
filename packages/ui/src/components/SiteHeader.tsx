import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { cx } from '../cx';
import { NavAnchor, type NavLink, type RenderLink } from './Link';

export interface SiteBrand {
  /** Wordmark. A string, or any node (e.g. an <img> logo with alt=""). */
  name: ReactNode;
  /** Where the brand links to. */
  href?: string;
  /** Decorative mark shown before the name (hidden from assistive tech). */
  mark?: ReactNode;
  /** Accessible name of the home link when `name` is an image, e.g. "Gori home". */
  label?: string;
}

export interface SiteHeaderProps {
  brand: SiteBrand;
  /** Primary navigation. Collapses into a menu button on narrow screens. */
  nav?: NavLink[];
  navLabel?: string;
  /** Always-visible controls on the right: language switch, theme toggle, a call to action. */
  actions?: ReactNode;
  /** Stays at the top while scrolling. */
  sticky?: boolean;
  renderLink?: RenderLink;
  className?: string;
  menuLabel?: { open: string; close: string };
}

export function SiteHeader({
  brand, nav = [], navLabel = 'Primary', actions, sticky, renderLink, className,
  menuLabel = { open: 'Open navigation menu', close: 'Close navigation menu' },
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const root = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); button.current?.focus(); }
    };
    const onPointer = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointer); };
  }, [open]);

  return (
    <header ref={root} className={cx('ds-header', sticky && 'ds-header--sticky', className)}>
      <div className="ds-container ds-header__bar">
        <a className="ds-brand" href={brand.href ?? '/'} aria-label={brand.label}>
          {brand.mark ? <span className="ds-brand__mark" aria-hidden="true">{brand.mark}</span> : null}
          <span className="ds-brand__name">{brand.name}</span>
        </a>

        {nav.length ? (
          <nav className="ds-header__nav" aria-label={navLabel}>
            {nav.map((l, i) => <NavAnchor key={i} link={l} className="ds-header__link" renderLink={renderLink} />)}
          </nav>
        ) : null}

        <div className="ds-header__actions">
          {actions}
          {nav.length ? (
            <button
              ref={button}
              type="button"
              className="ds-header__menu"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? menuLabel.close : menuLabel.open}
              onClick={() => setOpen(!open)}
            >
              <span className="ds-header__burger" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      {nav.length ? (
        <nav id={panelId} className="ds-header__panel" aria-label={`${navLabel} (menu)`} hidden={!open}>
          <div className="ds-container">
            {nav.map((l, i) => <NavAnchor key={i} link={l} className="ds-header__link" renderLink={renderLink} onClick={() => setOpen(false)} />)}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
