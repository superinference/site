#!/bin/bash
set -euo pipefail

REPO="superinference/site"
BASE_URL="https://github.com/$REPO/releases/latest/download"

bold()  { printf "\033[1m%s\033[0m" "$*"; }
green() { printf "\033[32m%s\033[0m" "$*"; }
dim()   { printf "\033[2m%s\033[0m" "$*"; }
yellow(){ printf "\033[33m%s\033[0m" "$*"; }

echo ""
echo "  $(bold 'SuperInference') installer"
echo "  $(dim 'https://www.superinference.org')"
echo ""

INSTALL_DIR="${INSTALL_DIR:-$HOME/.local/bin}"
mkdir -p "$INSTALL_DIR"

# Detect platform
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

case "$OS-$ARCH" in
  linux-x86_64)   BINARY="superinference-cli-linux-x64" ;;
  darwin-arm64)   BINARY="superinference-cli-darwin-arm64" ;;
  darwin-x86_64)  BINARY="superinference-cli-darwin-arm64" ;; # Rosetta 2
  *)
    echo "  No prebuilt binary for $OS-$ARCH."
    echo "  Install via npm instead:"
    echo ""
    echo "    npm install -g @superinference/cli"
    echo ""
    exit 1
    ;;
esac

# ── Clean up ALL existing installations ──────────────────────────
TARGET="$INSTALL_DIR/superinference"
CLEANED=0

# 1. Find every 'superinference' binary in PATH
while IFS= read -r existing; do
  [ -z "$existing" ] && continue
  # Skip the target location — we'll overwrite it anyway
  [ "$existing" = "$TARGET" ] && continue
  echo "  $(yellow 'Removing stale') $existing"
  rm -f "$existing" 2>/dev/null || true
  CLEANED=$((CLEANED + 1))
done < <(which -a superinference 2>/dev/null || true)

# 2. Check common alternative locations
for alt in \
  /usr/local/bin/superinference \
  "$HOME/.superinference/bin/superinference" \
  "$HOME/bin/superinference" \
  "$HOME/.local/share/superinference/superinference"
do
  if [ -f "$alt" ] && [ "$alt" != "$TARGET" ]; then
    echo "  $(yellow 'Removing stale') $alt"
    rm -f "$alt" 2>/dev/null || true
    CLEANED=$((CLEANED + 1))
  fi
done

# 3. Check for npm global install
if command -v npm >/dev/null 2>&1; then
  NPM_SI=$(npm ls -g @superinference/cli 2>/dev/null | grep superinference || true)
  if [ -n "$NPM_SI" ]; then
    echo "  $(yellow 'Removing npm global') @superinference/cli"
    npm uninstall -g @superinference/cli 2>/dev/null || true
    CLEANED=$((CLEANED + 1))
  fi
fi

# 4. Remove dead symlinks pointing to superinference
if [ -L "$TARGET" ]; then
  echo "  $(yellow 'Removing symlink') $TARGET"
  rm -f "$TARGET"
  CLEANED=$((CLEANED + 1))
fi

[ "$CLEANED" -gt 0 ] && echo "  $(dim "Cleaned $CLEANED stale installation(s)")" && echo ""

# ── Install fresh binary ─────────────────────────────────────────
if [ -f "$TARGET" ]; then
  ACTION="Updating"
else
  ACTION="Installing"
fi

echo "  $ACTION $(bold "$BINARY")..."

TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

curl -fsSL "$BASE_URL/$BINARY" -o "$TMP"
chmod +x "$TMP"
mv -f "$TMP" "$TARGET"
trap - EXIT

# macOS: remove quarantine flag and ad-hoc sign
if [ "$OS" = "darwin" ]; then
  xattr -d com.apple.quarantine "$TARGET" 2>/dev/null || true
  codesign --sign - --force "$TARGET" 2>/dev/null || true
fi

# Verify the binary works
if "$TARGET" --version >/dev/null 2>&1; then
  VERSION=$("$TARGET" --version 2>&1 || echo "unknown")
  echo "  $(green "$ACTION") $TARGET ($VERSION)"
else
  echo "  $(green "$ACTION") $TARGET"
fi
echo ""

# Check if INSTALL_DIR is in PATH
if ! echo "$PATH" | tr ':' '\n' | grep -qx "$INSTALL_DIR"; then
  echo "  $(dim 'Add to your PATH:')"
  echo "    export PATH=\"$INSTALL_DIR:\$PATH\""
  echo ""
fi

echo "  $(dim 'Get started:')"
echo "    superinference --help"
echo ""

# Offer VS Code extension
if command -v code >/dev/null 2>&1; then
  echo "  $(dim 'VS Code detected. Install the extension:')"
  echo "    code --install-extension superinference.ami-vscode"
  echo ""
fi
