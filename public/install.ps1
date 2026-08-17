param(
    [Parameter(Position=0)]
    [string]$Target = "latest"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$ProgressPreference = 'SilentlyContinue'

if (-not [Environment]::Is64BitProcess) {
    Write-Error "AMI does not support 32-bit Windows. Please use a 64-bit version of Windows."
    exit 1
}

$REPO = "superinference/releases"
$GITHUB_API = "https://api.github.com/repos/$REPO/releases"
$INSTALL_DIR = "$env:USERPROFILE\.local\bin"
$CORE_BINARY = "ami-tui.exe"

Write-Output ""
Write-Output "  Si:AMI installer for Windows"
Write-Output "  https://www.superinference.org"
Write-Output ""

New-Item -ItemType Directory -Force -Path $INSTALL_DIR | Out-Null

# Resolve release URL
if ($Target -eq "latest") {
    $releaseUrl = "$GITHUB_API/latest"
} else {
    $releaseUrl = "$GITHUB_API/tags/$Target"
}

try {
    $release = Invoke-RestMethod -Uri $releaseUrl -ErrorAction Stop
} catch {
    Write-Error "Failed to fetch release info: $_"
    exit 1
}

$version = $release.tag_name
Write-Output "  Version: $version"

# Find the Windows x64 asset
$asset = $release.assets | Where-Object { $_.name -eq "ami-cli-windows-x64.exe" }

if (-not $asset) {
    Write-Error "No Windows x64 binary found in release $version"
    exit 1
}

$downloadUrl = $asset.browser_download_url
$corePath = Join-Path $INSTALL_DIR $CORE_BINARY
$tempPath = Join-Path $env:TEMP "ami-install-$([System.IO.Path]::GetRandomFileName()).exe"

# Remove stale installations
$cleaned = 0
foreach ($name in @("ami.exe", "superinference.exe")) {
    $stale = Join-Path $INSTALL_DIR $name
    if (Test-Path $stale) {
        Write-Output "  Removing stale: $stale"
        Remove-Item -Force $stale
        $cleaned++
    }
}

# Check common locations
foreach ($alt in @(
    "C:\Program Files\ami\ami.exe",
    "$env:USERPROFILE\bin\ami.exe",
    "$env:USERPROFILE\.superinference\bin\superinference.exe"
)) {
    if (Test-Path $alt) {
        Write-Output "  Removing stale: $alt"
        Remove-Item -Force $alt -ErrorAction SilentlyContinue
        $cleaned++
    }
}

# Check for npm global install
try {
    $npmCheck = npm ls -g @superinference/cli 2>$null | Select-String "superinference"
    if ($npmCheck) {
        Write-Output "  Removing npm global: @superinference/cli"
        npm uninstall -g @superinference/cli 2>$null
        $cleaned++
    }
} catch {}

if ($cleaned -gt 0) {
    Write-Output "  Cleaned $cleaned stale installation(s)"
    Write-Output ""
}

# Download
if (Test-Path $corePath) {
    $action = "Updating"
} else {
    $action = "Installing"
}

Write-Output "  $action ami-cli-windows-x64.exe..."

try {
    Invoke-WebRequest -Uri $downloadUrl -OutFile $tempPath -ErrorAction Stop
} catch {
    Write-Error "Failed to download binary: $_"
    if (Test-Path $tempPath) { Remove-Item -Force $tempPath }
    exit 1
}

Move-Item -Force $tempPath $corePath

# Bundle winpty for Git Bash TTY support
$winptyTarget = Join-Path $INSTALL_DIR "winpty.exe"
$winptyDllTarget = Join-Path $INSTALL_DIR "winpty.dll"
if (-not (Test-Path $winptyTarget)) {
    $winptySource = $null

    # Look in Git for Windows installation
    try {
        $gitPath = (Get-Command git -ErrorAction Stop).Source
        $gitRoot = Split-Path (Split-Path $gitPath)
        $candidate = Join-Path $gitRoot "usr\bin\winpty.exe"
        if (Test-Path $candidate) { $winptySource = $candidate }
    } catch {}

    # Common Git install locations
    if (-not $winptySource) {
        foreach ($loc in @(
            "C:\Program Files\Git\usr\bin\winpty.exe",
            "C:\Program Files (x86)\Git\usr\bin\winpty.exe",
            "$env:LOCALAPPDATA\Programs\Git\usr\bin\winpty.exe"
        )) {
            if (Test-Path $loc) { $winptySource = $loc; break }
        }
    }

    if ($winptySource) {
        $winptyDir = Split-Path $winptySource
        Copy-Item $winptySource $winptyTarget
        $dllSource = Join-Path $winptyDir "winpty.dll"
        if (Test-Path $dllSource) {
            Copy-Item $dllSource $winptyDllTarget
        }
        Write-Output "  Bundled winpty (Git Bash TTY support)"
    } else {
        Write-Output "  Warning: winpty not found. Git Bash interactive mode may not work."
        Write-Output "  Install Git for Windows to get winpty, or use PowerShell/CMD instead."
    }
}

# Create ami.cmd wrapper (for CMD and PowerShell)
$cmdWrapper = Join-Path $INSTALL_DIR "ami.cmd"
$cmdContent = @'
@echo off
setlocal
set "CORE=%~dp0ami-tui.exe"
if not exist "%CORE%" (
    echo ami-tui.exe not found in %~dp0 >&2
    exit /b 1
)

REM If an explicit key is already set, use it as-is
if defined GOOGLE_API_KEY goto :run
if defined ANTHROPIC_API_KEY goto :run
if defined OPENAI_API_KEY goto :run

REM Otherwise, fetch a fresh gcloud token for Vertex AI
REM Always set GOOGLE_API_KEY (Bearer auth), never AI_API_KEY (x-api-key auth)
set "AI_API_KEY="
where gcloud >nul 2>&1
if not %ERRORLEVEL%==0 goto :run
for /f "tokens=*" %%t in ('gcloud auth print-access-token 2^>nul') do set "GOOGLE_API_KEY=%%t"

:run
"%CORE%" %*
exit /b %ERRORLEVEL%
'@
[System.IO.File]::WriteAllText($cmdWrapper, $cmdContent, [System.Text.UTF8Encoding]::new($false))

# Create ami bash wrapper (for Git Bash — uses winpty to fix raw mode)
$bashWrapper = Join-Path $INSTALL_DIR "ami"
$bashContent = @'
#!/bin/bash
DIR="$(dirname "$0")"
CORE="$DIR/ami-tui.exe"
if [ ! -f "$CORE" ]; then
    echo "ami-tui.exe not found in $DIR" >&2
    exit 1
fi

# Fetch fresh gcloud token if no explicit key is set
# Use GOOGLE_API_KEY (Bearer auth), clear AI_API_KEY (x-api-key auth) to avoid conflicts
if [ -z "$GOOGLE_API_KEY" ] && [ -z "$ANTHROPIC_API_KEY" ] && [ -z "$OPENAI_API_KEY" ]; then
    unset AI_API_KEY
    if command -v gcloud >/dev/null 2>&1; then
        export GOOGLE_API_KEY="$(gcloud auth print-access-token 2>/dev/null)"
    fi
fi

# Non-interactive (piped, --prompt mode, CI) - run directly
if [ ! -t 0 ] || [ ! -t 1 ]; then
    exec "$CORE" "$@"
fi

# Interactive terminal - need winpty for raw mode in MinTTY/Git Bash

# 1. Bundled winpty (copied by installer)
if [ -x "$DIR/winpty.exe" ]; then
    exec "$DIR/winpty.exe" "$CORE" "$@"
fi

# 2. winpty on PATH
if command -v winpty >/dev/null 2>&1; then
    exec winpty "$CORE" "$@"
fi

# 3. Git for Windows locations
for gitdir in "/c/Program Files/Git" "/c/Program Files (x86)/Git" "$LOCALAPPDATA/Programs/Git"; do
    wp="$gitdir/usr/bin/winpty.exe"
    if [ -x "$wp" ]; then
        exec "$wp" "$CORE" "$@"
    fi
done

# 4. No winpty - launch in a new console window
echo "winpty not found. Launching in a new console window..." >&2
CORE_WIN="$(cygpath -w "$CORE" 2>/dev/null || echo "$CORE")"
cmd.exe //c start "AMI" "$CORE_WIN" "$@"
'@
[System.IO.File]::WriteAllText($bashWrapper, $bashContent.Replace("`r`n", "`n"), [System.Text.UTF8Encoding]::new($false))

# Verify the binary works
try {
    $ver = & $corePath --version 2>&1
    Write-Output "  $action $corePath ($ver)"
} catch {
    Write-Output "  $action $corePath"
}
Write-Output "  Created ami.cmd   (CMD/PowerShell wrapper)"
Write-Output "  Created ami       (Git Bash wrapper with winpty)"
Write-Output ""

# Check if INSTALL_DIR is in PATH
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$INSTALL_DIR*") {
    Write-Output "  Adding $INSTALL_DIR to your PATH..."
    [Environment]::SetEnvironmentVariable("Path", "$INSTALL_DIR;$userPath", "User")
    $env:Path = "$INSTALL_DIR;$env:Path"
    Write-Output "  PATH updated. Restart your terminal for changes to take effect."
    Write-Output ""
}

Write-Output "  Get started:"
Write-Output "    ami --help"
Write-Output ""

# Offer VS Code extension
try {
    if (Get-Command code -ErrorAction SilentlyContinue) {
        Write-Output "  VS Code detected. Install the extension:"
        Write-Output "    code --install-extension superinference.ami-vscode"
        Write-Output ""
    }
} catch {}
