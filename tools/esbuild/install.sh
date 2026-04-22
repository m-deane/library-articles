#!/usr/bin/env bash
# Download pinned esbuild static binaries into this directory.
# build.py expects:
#   tools/esbuild/esbuild-darwin-arm64   (local dev on Apple Silicon)
#   tools/esbuild/esbuild-linux-x64      (GitHub Actions ubuntu-latest)
# Either file is sufficient on its own for the matching platform.
# Versions pinned so local + CI agree on JSX transpile output.
set -euo pipefail

ESBUILD_VERSION="0.21.0"
DIR="$(cd "$(dirname "$0")" && pwd)"

fetch() {
  local npm_pkg="$1"
  local out_name="$2"
  local out_path="$DIR/$out_name"
  if [[ -x "$out_path" ]]; then
    echo "[esbuild/install] $out_name already present ($("$out_path" --version 2>/dev/null || echo '?')) — skipping"
    return 0
  fi
  echo "[esbuild/install] downloading $out_name (esbuild ${ESBUILD_VERSION})"
  local tmp
  tmp="$(mktemp -d)"
  trap 'rm -rf "$tmp"' RETURN
  curl -fsSL -o "$tmp/pkg.tgz" \
    "https://registry.npmjs.org/${npm_pkg}/-/$(basename "${npm_pkg}")-${ESBUILD_VERSION}.tgz"
  tar -xzf "$tmp/pkg.tgz" -C "$tmp"
  mv "$tmp/package/bin/esbuild" "$out_path"
  chmod +x "$out_path"
  echo "[esbuild/install] -> $out_path ($("$out_path" --version))"
}

UNAME_S="$(uname -s)"
UNAME_M="$(uname -m)"

case "${1:-auto}" in
  darwin-arm64) fetch "@esbuild/darwin-arm64" "esbuild-darwin-arm64" ;;
  linux-x64)    fetch "@esbuild/linux-x64"    "esbuild-linux-x64" ;;
  all)
    fetch "@esbuild/darwin-arm64" "esbuild-darwin-arm64"
    fetch "@esbuild/linux-x64"    "esbuild-linux-x64"
    ;;
  auto|"")
    if [[ "$UNAME_S" == "Darwin" ]] && [[ "$UNAME_M" == "arm64" || "$UNAME_M" == "aarch64" ]]; then
      fetch "@esbuild/darwin-arm64" "esbuild-darwin-arm64"
    elif [[ "$UNAME_S" == "Linux" ]] && [[ "$UNAME_M" == "x86_64" ]]; then
      fetch "@esbuild/linux-x64" "esbuild-linux-x64"
    else
      echo "[esbuild/install] unknown platform ($UNAME_S/$UNAME_M) — pass an explicit target: darwin-arm64 | linux-x64 | all" >&2
      exit 1
    fi
    ;;
  *)
    echo "Usage: $0 [auto|darwin-arm64|linux-x64|all]" >&2
    exit 2
    ;;
esac
