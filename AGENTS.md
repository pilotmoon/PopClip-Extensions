# Repository Guidelines

## Project Structure & Module Organization

- `source/`: Official extensions, each in `Name.popclipext` with
  `Config.ts|js|json|yaml`, optional `Readme.md`, and assets.
- `contrib/`: Community and experimental extensions. New submissions go here.
- `lib/`: Shared helpers published locally as `@popclip/helpers`.
- `misc/`: Maintenance tools (e.g., `misc/pcxconvert` to migrate legacy
  configs).

## Build, Test, and Development Commands

- `npm run check`: Type-check the repo via `tsc --noEmit`.
- `npx biome check .`: Lint code using Biome.
- `npx biome format . --write`: Auto-format files.
- `misc/pcxconvert`: Convert `Config.plist` → YAML via `convert.ts` (run in an
  extension folder).

No bundle step is required for extensions; PopClip loads source files directly.

## Coding Style & Naming Conventions

- Indentation: 2 spaces; formatter: Biome (see `biome.json`).
- Language: Prefer TypeScript; target ES2018; strict mode enabled (see
  `tsconfig.json`).
- Extension folder: `TitleCase.popclipext` (e.g., `Uppercase.popclipext`).
- Config file: `Config.ts` (or `Config.js`) using `@popclip/types` and
  `@popclip/helpers`.
- Assets: Place alongside config; use clear names (e.g., `icon.png`).

## Testing Guidelines

- Required: pass `npm run check` and `npx biome check .` before PR.
- Manual verification: install your extension build into PopClip and confirm
  actions/options work.
- Optional unit tests for helper code may live next to sources (e.g.,
  `foo.test.ts`). There is no repo-wide test runner.

## Commit & Pull Request Guidelines

- Commits: short, descriptive imperatives (e.g., "Update Kagi translate
  options"). Group related changes.
- PRs: include purpose, scope, user impact, and any screenshots where UI changes
  are relevant. Link issues when applicable.
- New extensions: submit under `contrib/Name.popclipext` with `Readme.md`, a
  concise `description` in Config, and a suitable icon. Follow quality criteria
  in `README.md`.

## Security & Configuration Tips

- Do not commit secrets or API keys. Use PopClip options for user-provided keys
  and document acquisition steps.
- Avoid external runtime dependencies for shell/AppleScript actions; extensions
  must work on stock macOS.

## Architecture Overview

Extensions are self-contained modules. Config defines actions, requirements, and
metadata; shared logic belongs in `lib/@popclip/helpers` to reduce duplication.
