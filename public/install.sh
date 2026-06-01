#!/bin/bash
set -euo pipefail

REPO="superinference/site"
BASE_URL="https://github.com/$REPO/releases/latest/download"

bold()  { printf "\033[1m%s\033[0m" "$*"; }
green() { printf "\033[32m%s\033[0m" "$*"; }
dim()   { printf "\033[2m%s\033[0m" "$*"; }

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

TARGET="$INSTALL_DIR/superinference"

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

# macOS: remove quarantine flag so Gatekeeper doesn't kill the binary
if [ "$OS" = "darwin" ]; then
  xattr -d com.apple.quarantine "$TARGET" 2>/dev/null || true
fi

if [ "$ACTION" = "Updating" ]; then
  echo "  $(green 'Updated') $TARGET"
else
  echo "  $(green 'Installed') to $TARGET"
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
