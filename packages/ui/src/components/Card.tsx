import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../cx';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  /** Right-aligned controls in the header. */
  actions?: ReactNode;
  /** Heading level for the title, so the page outline stays correct. */
  headingLevel?: 2 | 3 | 4;
  as?: 'section' | 'div' | 'article';
}

export function Card({ title, actions, headingLevel = 3, as: Tag = 'section', className, children, ...rest }: CardProps) {
  const H = `h${headingLevel}` as 'h2' | 'h3' | 'h4';
  return (
    <Tag className={cx('ds-card', className)} {...rest}>
      {title || actions ? (
        <header className="ds-card__head">
          {title ? <H className="ds-card__title">{title}</H> : <span />}
          {actions ? <div className="ds-card__actions">{actions}</div> : null}
        </header>
      ) : null}
      <div className="ds-card__body">{children}</div>
    </Tag>
  );
}
