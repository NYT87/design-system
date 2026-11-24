import { useEffect, useId, useRef, type ReactNode } from 'react';
import { cx } from '../cx';
import { Button } from './Button';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  /** Action buttons, right-aligned. Defaults to a single Close button. */
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

/** Built on the native <dialog>: focus is trapped, Esc closes, the page behind is inert, focus returns to the opener. */
export function Modal({ open, onClose, title, children, footer, size = 'md' }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cx('ds-modal', `ds-modal--${size}`)}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
    >
      <div className="ds-modal__panel">
        <h2 id={titleId} className="ds-modal__title">{title}</h2>
        <div className="ds-modal__body">{children}</div>
        <div className="ds-modal__foot">{footer ?? <Button variant="secondary" onClick={onClose}>Close</Button>}</div>
      </div>
    </dialog>
  );
}
