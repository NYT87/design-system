import type { color as Color } from './tokens.mjs';

/** Every colour token. A test keeps this list equal to the tokens in tokens.mjs. */
export type ColorToken =
  | 'bg'
  | 'bg-raised'
  | 'bg-sunken'
  | 'fg'
  | 'fg-muted'
  | 'border'
  | 'border-strong'
  | 'accent'
  | 'on-accent'
  | 'accent-ink'
  | 'link'
  | 'ok'
  | 'warn'
  | 'danger'
  | 'on-status'
  | 'ring'
  | 'scrim'
  | 'shadow'
  | 'series-1'
  | 'series-2'
  | 'series-3'
  | 'series-4'
  | 'series-5';
export type ColorOverrides = Partial<Record<ColorToken, string>>;
export interface ThemeOverrides { light?: ColorOverrides; dark?: ColorOverrides }
export interface ContrastFailure { mode: 'light' | 'dark'; fg: ColorToken; bg: ColorToken; ratio: number; min: number; fgColor: string; bgColor: string }

export const COLOR_TOKENS: ColorToken[];
export const RULES: Array<[ColorToken, ColorToken, number]>;
export function themeCss(selector: string, theme?: ThemeOverrides, options?: { on?: 'root' | 'scope' }): string;
export function contrast(a: string, b: string): number | null;
export function checkTheme(theme?: ThemeOverrides, preset?: typeof Color): ContrastFailure[];
export function assertKnownTokens(overrides: ThemeOverrides): void;
export function defineTheme(options: ThemeOverrides & { name: string; attribute?: string }): { css: string; failures: ContrastFailure[] };
