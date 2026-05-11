#!/usr/bin/env bash

# @tofrankie/config release tail: git push → tag → push tag → pnpm github:release
# From the skill directory root: bash scripts/release.sh <package-name> <tag>
# <tag> must be <package-name>@<version>; pass values resolved from package.json by the caller.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$SKILL_ROOT/../../.." && pwd)"

usage() {
  cat <<'EOF'
Usage: bash scripts/release.sh <package-name> <tag>

  package-name   Full npm package name, e.g. @tofrankie/eslint
  tag            Matching release tag, e.g. @tofrankie/eslint@1.0.0

Steps: git push origin HEAD → git tag → push tag → pnpm github:release --yes

Quote arguments that contain @ so the shell does not mangle them.
EOF
}

if [[ "${1:-}" == '-h' || "${1:-}" == '--help' ]]; then
  usage
  exit 0
fi

if [[ $# -ne 2 ]]; then
  echo "Error: need <package-name> and <tag> (e.g. '@tofrankie/eslint' '@tofrankie/eslint@1.0.0')" >&2
  usage >&2
  exit 1
fi

PACKAGE_NAME="$1"
TAG="$2"
REF_TAG="refs/tags/${TAG}"

cd "$REPO_ROOT"

git push origin HEAD
git tag "$TAG"
git push origin "$REF_TAG"
pnpm github:release --package "$PACKAGE_NAME" --tag "$TAG" --yes
