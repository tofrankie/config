---
name: tofrankie-config-release
description: >-
  Runs the formal single-package release tail for this repo: git push, tag, push tag, then
  pnpm github:release --package --tag --yes. Use only when the user explicitly says 正式发布 followed by a package
  name (e.g. 正式发布 eslint or 正式发布 @tofrankie/eslint). Do not auto-apply for vague release or npm discussion;
  lint, versioning, changelog, and tests are assumed done beforehand.
---

# Formal release (manual)

## When to apply (strict)

- Run this flow only when the user’s message includes the phrase `正式发布` immediately followed by a package identifier (short name like `eslint`, or full name like `@tofrankie/eslint`).
- Do not auto-apply for vague “release”, “publish”, or general npm chatter.
- Version bumps, changelog, lint, and tests are assumed complete; this skill only covers the steps below.

## Overall flow

1. Locate `package.json` under the repo `packages/` tree:
   - `name` matches the user input, or
   - short name maps to `@tofrankie/<short>`
2. Read that package’s `name` and `version` → `<package-name>` and `<version>`.
3. Form the tag `<package-name>@<version>`.
4. Pass `<package-name>` and `<package-name>@<version>` as arguments to `scripts/release.sh`.

## Script

From the skill directory root:

```bash
bash scripts/release.sh <package-name> <tag>
```

Script steps (order fixed):

1. `git push origin HEAD`
2. `git tag <package-name>@<version>`
3. `git push origin refs/tags/<package-name>@<version>`
4. `pnpm github:release --package <package-name> --tag <package-name>@<version> --yes`
