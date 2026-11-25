import { defineConfig } from 'tsup';

// One small file per behaviour so a page can load only what it uses. @nyt87/tokens stays external (resolved by the consumer's bundler).
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    menu: 'src/behaviors/menu.ts',
    tabs: 'src/behaviors/tabs.ts',
    modal: 'src/behaviors/modal.ts',
    copy: 'src/behaviors/copy.ts',
    drop: 'src/behaviors/drop.ts',
    'theme-scope': 'src/behaviors/theme-scope.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  minify: true,
  target: 'es2022',
  platform: 'browser',
  splitting: false,
});
