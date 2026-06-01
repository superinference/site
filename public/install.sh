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
  linux-x86_64)  BINARY="superinference-cli-linux-x64" ;;
  *)
    echo "  No prebuilt binary for $OS-$ARCH."
    echo "  Install via npm instead:"
    echo ""
    echo "    npm install -g @superinference/cli"
    echo ""
    exit 1
    ;;
esac

echo "  Downloading $(bold "$BINARY")..."
curl -fsSL "$BASE_URL/$BINARY" -o "$INSTALL_DIR/superinference"
chmod +x "$INSTALL_DIR/superinference"

echo "  $(green 'Installed') to $INSTALL_DIR/superinference"
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
