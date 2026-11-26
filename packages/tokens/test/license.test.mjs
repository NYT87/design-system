import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// The design system is MIT licensed. These checks keep the licence on every published artifact: the file in each
// package, the SPDX field, the third-party notices the icons package owes, and the release workflow.
const root = new URL('../../../', import.meta.url).pathname;
const read = path => readFileSync(join(root, path), 'utf8');
const packages = ['tokens', 'ui', 'icons'];

test('the repository has an MIT licence in the name of NYT87', () => {
  const license = read('LICENSE');
  assert.match(license, /^MIT License\n/);
  assert.match(license, /Copyright \(c\) 2026 NYT87/);
  assert.match(license, /Permission is hereby granted, free of charge/);
});

test('every package carries the same LICENSE file', () => {
  for (const name of packages) assert.equal(read(`packages/${name}/LICENSE`), read('LICENSE'), name);
});

test('package.json licence fields match the licences', () => {
  assert.equal(JSON.parse(read('packages/tokens/package.json')).license, 'MIT');
  assert.equal(JSON.parse(read('packages/ui/package.json')).license, 'MIT');
  // The icons package also redistributes Lucide (ISC), the GitHub mark (MIT) and the LinkedIn mark (CC0).
  assert.equal(JSON.parse(read('packages/icons/package.json')).license, 'MIT AND ISC AND CC0-1.0');
  assert.equal(JSON.parse(read('package.json')).license, 'MIT');
});

test('the icons package ships the notices its bundled artwork requires', () => {
  const notices = read('packages/icons/THIRD-PARTY-NOTICES.md');
  assert.match(notices, /Lucide Icons and Contributors/);
  assert.match(notices, /ISC License/);
  assert.match(notices, /Copyright \(c\) \d{4} GitHub Inc\./);
  assert.match(notices, /Simple Icons/);
  assert.match(notices, /CC0/);
  assert.match(notices, /trademarks/i);
});

test('the published tarballs contain the licence files', () => {
  for (const name of packages) {
    const out = execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], { cwd: join(root, 'packages', name), encoding: 'utf8' });
    const files = JSON.parse(out)[0].files.map(file => file.path);
    assert.ok(files.includes('LICENSE'), `${name} ships LICENSE`);
    if (name === 'icons') for (const extra of ['THIRD-PARTY-NOTICES.md', 'LICENSE-LUCIDE']) assert.ok(files.includes(extra), `icons ships ${extra}`);
  }
});

test('the release workflow can also publish to npmjs.org, only when NPM_TOKEN is configured', () => {
  const workflow = read('.github/workflows/release.yml');
  assert.match(workflow, /NPM_TOKEN: \$\{\{ secrets\.NPM_TOKEN \}\}/);
  assert.match(workflow, /--@nyt87:registry=https:\/\/registry\.npmjs\.org\//);
  assert.match(workflow, /--access public/);
  assert.match(workflow, /NPM_TOKEN is not set/, 'the step skips quietly without the secret');
});
