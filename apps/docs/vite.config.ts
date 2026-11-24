import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const ui = (f: string) => fileURLToPath(new URL(`../../packages/ui/src/${f}`, import.meta.url));

// base './' keeps the build portable: it works at a domain root, a sub-path, or opened from disk via any static host.
export default defineConfig({ base: './', plugins: [react()],
  // The docs always show the current source of the components, with hot reload, without building the package first.
  resolve: { alias: [{ find: '@nyt87/ui/styles.css', replacement: ui('styles.css') }, { find: /^@nyt87\/ui$/, replacement: ui('index.ts') }] }, build: { outDir: 'dist', sourcemap: false } });
