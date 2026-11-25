// Registers every behaviour. Import single modules instead to ship less:
//   import '@nyt87/ui/menu'  /tabs  /modal  /copy  /drop  /theme-scope
import './behaviors/menu';
import './behaviors/tabs';
import './behaviors/modal';
import './behaviors/copy';
import './behaviors/drop';
import './behaviors/theme-scope';
export { checkTheme, defineTheme, themeCss, contrast, type ColorToken, type ColorOverrides, type ContrastFailure } from '@nyt87/tokens/theme';
