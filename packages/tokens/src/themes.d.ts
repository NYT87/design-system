import type { ThemeOverrides } from './theme.js';
export interface NamedTheme extends ThemeOverrides { name: string }
export const gori: NamedTheme;
export const themes: Record<string, NamedTheme>;
