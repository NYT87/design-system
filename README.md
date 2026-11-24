# nyt87 design system

| Package | What |
|---|---|
| `packages/tokens` (`@nyt87/tokens`) | Design tokens as CSS variables, with a WCAG contrast test. Source: `src/tokens.mjs`. |
| `packages/ui` (`@nyt87/ui`) | 16 accessible React components styled only with tokens. |
| `apps/docs` | The public component guide: live examples, code, usage rules, a11y notes, props. |

Language and rules: [DESIGN.md](DESIGN.md).

```
npm install
npm run dev        # build tokens, start the docs site
npm test           # contrast tests + component tests
npm run typecheck
npm run build      # static site in apps/docs/dist
```

## Publishing the guide
`.github/workflows/pages.yml` tests, builds and deploys `apps/docs/dist` to GitHub Pages on every push to `main` (pull requests only build and test). One-time setup: in the repo go to Settings > Pages and set Source to **GitHub Actions**. The site is then at `https://<owner>.github.io/<repo>/`. The build uses relative asset paths and hash routing, so it works under that sub-path with no config.

## Releasing the packages
Both packages are published to GitHub Packages (`https://npm.pkg.github.com`) under the `@nyt87` scope, with the same version number.
```
npm version 0.2.0 -ws --no-git-tag-version
git commit -am "release 0.2.0" && git tag v0.2.0 && git push --follow-tags
```
`.github/workflows/publish.yml` checks that the tag matches both versions, runs tests, builds, and publishes `@nyt87/tokens` then `@nyt87/ui`. A version can be published only once: bump it for every release.

## Using the packages in a project
GitHub Packages needs a token to install, even for public packages.

1. Add `.npmrc` to the project (safe to commit, it holds no secret):
```
@nyt87:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```
2. Locally: `gh auth refresh -s read:packages`, then `export NODE_AUTH_TOKEN=$(gh auth token)` (put it in your shell profile).
3. In GitHub Actions of the consuming repo: give the job `permissions: { contents: read, packages: read }` and set `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}` on the install step. In the package's settings on GitHub (Package settings > Manage Actions access), add each consuming repository so its `GITHUB_TOKEN` may read it.
4. `npm i @nyt87/tokens @nyt87/ui react react-dom`, then import the two stylesheets once (see the docs site, Getting started).

## Adding a component
1. `packages/ui/src/components/Name.tsx`, styles in `styles.css` (tokens only), export in `index.ts`.
2. A test in `packages/ui/test`.
3. `apps/docs/src/examples/Name.tsx` (shown live and as its own code snippet) and an entry in `apps/docs/src/content.ts`.

## Adopting in a product
See `packages/tokens/README.md` for the variable rename map. Replace local duplicates (modals, empty states, error panels, stat grids) with `@nyt87/ui` one at a time.
