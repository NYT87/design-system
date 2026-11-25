// Renders banner.html to banner-light.png and banner-dark.png (2x, for crisp display on GitHub).
// Needs Playwright with a Chromium: `npm i --no-save playwright && npx playwright install chromium`, then
//   npm run build:tokens && node .github/banner/render.mjs
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('.', import.meta.url));
const browser = await chromium.launch();
for (const theme of ['light', 'dark']) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 360 }, deviceScaleFactor: 2, colorScheme: theme });
  await page.goto(`file://${dir}banner.html?theme=${theme}`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${dir}banner-${theme}.png` });
  console.log(`wrote banner-${theme}.png`);
}
await browser.close();
