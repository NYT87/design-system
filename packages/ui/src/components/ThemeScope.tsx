import { useEffect, useId, type ElementType, type HTMLAttributes } from 'react';
import { checkTheme, themeCss, assertKnownTokens, type ColorOverrides, type ContrastFailure } from '@nyt87/tokens/theme';
import { cx } from '../cx';

export interface ThemeScopeProps extends HTMLAttributes<HTMLElement> {
  /** Colour tokens to change in light mode. Only list what you change: the rest inherit. */
  light?: ColorOverrides;
  /** Colour tokens to change in dark mode. A scope that sets only `light` keeps the base dark colours. */
  dark?: ColorOverrides;
  as?: ElementType;
  /** Called when the theme fails WCAG contrast. By default a warning is logged to the console. */
  onContrastFailures?: (failures: ContrastFailure[]) => void;
}

/**
 * Re-colours everything inside it with your own colours, in both light and dark mode, without touching global CSS.
 * Components read the tokens, so a Button, Alert or Tabs inside picks the new accent automatically.
 *
 *   <ThemeScope light={{ accent: '#0a5ad4' }} dark={{ accent: '#5aa2ff', 'on-accent': '#08111c' }}> ... </ThemeScope>
 *
 * Contrast is checked against the same rules as the built-in themes.
 */
export function ThemeScope({ light, dark, as: Tag = 'div', onContrastFailures, className, children, ...rest }: ThemeScopeProps) {
  const id = 'ds-scope-' + useId().replace(/[^a-zA-Z0-9]/g, '');
  assertKnownTokens({ light, dark });
  const css = themeCss(`.${id}`, { light, dark }, { on: 'scope' });
  const key = JSON.stringify([light, dark]);

  useEffect(() => {
    const failures = checkTheme({ light, dark });
    if (!failures.length) return;
    if (onContrastFailures) onContrastFailures(failures);
    else console.warn(`[@nyt87/ui] ThemeScope fails WCAG contrast:\n` + failures.map((f) => `  ${f.mode}: ${f.fg} ${f.fgColor} on ${f.bg} ${f.bgColor} = ${f.ratio}:1 (needs ${f.min}:1)`).join('\n'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <Tag className={cx(id, className)} {...rest}>
      <style>{css}</style>
      {children}
    </Tag>
  );
}
