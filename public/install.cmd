@echo off
setlocal enabledelayedexpansion

REM Si:AMI Windows CMD Installer
REM For environments where PowerShell is not available

set "TARGET=%~1"
if "!TARGET!"=="" set "TARGET=latest"

REM Check for 64-bit Windows
if /i "%PROCESSOR_ARCHITECTURE%"=="AMD64" goto :arch_valid
if /i "%PROCESSOR_ARCHITECTURE%"=="ARM64" goto :arch_valid
if /i "%PROCESSOR_ARCHITEW6432%"=="AMD64" goto :arch_valid
if /i "%PROCESSOR_ARCHITEW6432%"=="ARM64" goto :arch_valid

echo AMI does not support 32-bit Windows. Please use a 64-bit version of Windows. >&2
exit /b 1

:arch_valid

set "REPO=superinference/releases"
set "INSTALL_DIR=%USERPROFILE%\.local\bin"
set "CORE_BINARY=ami-tui.exe"
set "ASSET_NAME=ami-cli-windows-x64.exe"

echo.
echo   Si:AMI installer for Windows
echo   https://www.superinference.org
echo.

if not exist "!INSTALL_DIR!" mkdir "!INSTALL_DIR!"

REM Check for curl
curl --version >nul 2>&1
if !ERRORLEVEL! neq 0 (
    echo curl is required but not available. Please use the PowerShell installer instead: >&2
    echo   irm https://www.superinference.org/install.ps1 ^| iex >&2
    exit /b 1
)

REM Fetch latest release info from GitHub API
set "TEMP_RELEASE=%TEMP%\ami-release.json"

if /i "!TARGET!"=="latest" (
    call :download_file "https://api.github.com/repos/!REPO!/releases/latest" "!TEMP_RELEASE!"
) else (
    call :download_file "https://api.github.com/repos/!REPO!/releases/tags/!TARGET!" "!TEMP_RELEASE!"
)
if !ERRORLEVEL! neq 0 (
    echo Failed to fetch release info >&2
    exit /b 1
)

REM Extract the download URL for the Windows binary
set "DOWNLOAD_URL="
for /f "tokens=1,* delims=:" %%a in ('findstr /c:"browser_download_url" "!TEMP_RELEASE!" ^| findstr /c:"windows-x64"') do (
    set "LINE=%%b"
    set "LINE=!LINE: =!"
    set "LINE=!LINE:"=!"
    set "LINE=!LINE:,=!"
    set "DOWNLOAD_URL=https:!LINE!"
)
del "!TEMP_RELEASE!" >nul 2>&1

if "!DOWNLOAD_URL!"=="" (
    echo No Windows x64 binary found in release >&2
    exit /b 1
)

REM Extract version from URL
for /f "tokens=7 delims=/" %%v in ("!DOWNLOAD_URL!") do set "VERSION=%%v"
echo   Version: !VERSION!

set "CORE_PATH=!INSTALL_DIR!\!CORE_BINARY!"
set "TEMP_PATH=%TEMP%\ami-install-tmp.exe"

REM Remove stale installations
set CLEANED=0
for %%n in (ami.exe superinference.exe) do (
    set "STALE=!INSTALL_DIR!\%%n"
    if exist "!STALE!" (
        echo   Removing stale: !STALE!
        del /f "!STALE!" >nul 2>&1
        set /a CLEANED+=1
    )
)

if !CLEANED! gtr 0 (
    echo   Cleaned !CLEANED! stale installation^(s^)
    echo.
)

REM Download
if exist "!CORE_PATH!" (
    set "ACTION=Updating"
) else (
    set "ACTION=Installing"
)

echo   !ACTION! !ASSET_NAME!...

call :download_file "!DOWNLOAD_URL!" "!TEMP_PATH!"
if !ERRORLEVEL! neq 0 (
    echo Failed to download binary >&2
    if exist "!TEMP_PATH!" del "!TEMP_PATH!"
    exit /b 1
)

move /y "!TEMP_PATH!" "!CORE_PATH!" >nul

REM Bundle winpty for Git Bash TTY support
if not exist "!INSTALL_DIR!\winpty.exe" (
    set "WINPTY_SRC="

    REM Look for Git installation via where command
    where git >nul 2>&1
    if !ERRORLEVEL! equ 0 (
        for /f "tokens=*" %%g in ('where git') do (
            set "GIT_CMD=%%g"
        )
    )
    if defined GIT_CMD (
        for %%g in ("!GIT_CMD!") do set "GIT_CMD_DIR=%%~dpg"
        for %%g in ("!GIT_CMD_DIR!..") do set "GIT_ROOT=%%~fg"
        if exist "!GIT_ROOT!\usr\bin\winpty.exe" set "WINPTY_SRC=!GIT_ROOT!\usr\bin"
    )

    REM Check common locations
    if not defined WINPTY_SRC (
        if exist "C:\Program Files\Git\usr\bin\winpty.exe" set "WINPTY_SRC=C:\Program Files\Git\usr\bin"
    )
    if not defined WINPTY_SRC (
        if exist "C:\Program Files (x86)\Git\usr\bin\winpty.exe" set "WINPTY_SRC=C:\Program Files (x86)\Git\usr\bin"
    )

    if defined WINPTY_SRC (
        copy /y "!WINPTY_SRC!\winpty.exe" "!INSTALL_DIR!\winpty.exe" >nul
        if exist "!WINPTY_SRC!\winpty.dll" copy /y "!WINPTY_SRC!\winpty.dll" "!INSTALL_DIR!\winpty.dll" >nul
        echo   Bundled winpty ^(Git Bash TTY support^)
    ) else (
        echo   Warning: winpty not found. Git Bash interactive mode may not work.
        echo   Install Git for Windows to get winpty, or use PowerShell/CMD instead.
    )
)

REM Create ami.cmd wrapper (for CMD and PowerShell)
set "CMD_WRAPPER=!INSTALL_DIR!\ami.cmd"
(
echo @echo off
echo setlocal
echo set "CORE=%%~dp0ami-tui.exe"
echo if not exist "%%CORE%%" ^(
echo     echo ami-tui.exe not found in %%~dp0 ^>^&2
echo     exit /b 1
echo ^)
echo REM Fetch fresh gcloud token if no API key is already set
echo if defined AI_API_KEY goto :run
echo if defined ANTHROPIC_API_KEY goto :run
echo if defined GOOGLE_API_KEY goto :run
echo if defined OPENAI_API_KEY goto :run
echo where gcloud ^>nul 2^>^&1
echo if %%ERRORLEVEL%% neq 0 goto :run
echo for /f "tokens=*" %%%%t in ^('gcloud auth print-access-token 2^^^>nul'^) do set "GOOGLE_API_KEY=%%%%t"
echo :run
echo "%%CORE%%" %%*
echo exit /b %%ERRORLEVEL%%
) > "!CMD_WRAPPER!"

REM Create ami bash wrapper (for Git Bash)
REM Uses PowerShell here-string equivalent to write multi-line bash with correct content
set "BASH_WRAPPER=!INSTALL_DIR!\ami"
(
echo #!/bin/bash
echo DIR="$^(dirname "$0"^)"
echo CORE="$DIR/ami-tui.exe"
echo if [ ! -f "$CORE" ]; then
echo     echo "ami-tui.exe not found in $DIR" ^>^&2
echo     exit 1
echo fi
echo if [ ! -t 0 ] ^|^| [ ! -t 1 ]; then
echo     exec "$CORE" "$@"
echo fi
echo if [ -x "$DIR/winpty.exe" ]; then
echo     exec "$DIR/winpty.exe" "$CORE" "$@"
echo fi
echo if command -v winpty ^>/dev/null 2^>^&1; then
echo     exec winpty "$CORE" "$@"
echo fi
echo for gitdir in "/c/Program Files/Git" "/c/Program Files ^(x86^)/Git"; do
echo     wp="$gitdir/usr/bin/winpty.exe"
echo     if [ -x "$wp" ]; then exec "$wp" "$CORE" "$@"; fi
echo done
echo echo "winpty not found. Launching in a new console window..." ^>^&2
echo cmd.exe //c start "AMI" "$CORE" "$@"
) > "!BASH_WRAPPER!"

REM Verify the binary works
"!CORE_PATH!" --version >nul 2>&1
if !ERRORLEVEL! equ 0 (
    for /f "tokens=*" %%v in ('"!CORE_PATH!" --version 2^>^&1') do set "BIN_VER=%%v"
    echo   !ACTION! !CORE_PATH! ^(!BIN_VER!^)
) else (
    echo   !ACTION! !CORE_PATH!
)
echo   Created ami.cmd   ^(CMD/PowerShell wrapper^)
echo   Created ami       ^(Git Bash wrapper with winpty^)
echo.

REM Check if INSTALL_DIR is in PATH
echo %PATH% | findstr /i /c:"!INSTALL_DIR!" >nul
if !ERRORLEVEL! neq 0 (
    echo   Adding !INSTALL_DIR! to your PATH...
    setx PATH "!INSTALL_DIR!;%PATH%" >nul 2>&1
    set "PATH=!INSTALL_DIR!;%PATH%"
    echo   PATH updated. Restart your terminal for changes to take effect.
    echo.
)

echo   Get started:
echo     ami --help
echo.

exit /b 0

REM ============================================================================
REM SUBROUTINES
REM ============================================================================

:download_file
set "DL_URL=%~1"
set "DL_OUTPUT=%~2"

curl -fsSL "!DL_URL!" -o "!DL_OUTPUT!" 2>"!DL_OUTPUT!.stderr"
set "CURL_RESULT=!ERRORLEVEL!"
if !CURL_RESULT! equ 0 goto :download_done

REM Handle certificate revocation check failures on corporate networks
findstr /i /c:"0x80092012" /c:"0x80092013" "!DL_OUTPUT!.stderr" >nul
if !ERRORLEVEL! neq 0 (
    type "!DL_OUTPUT!.stderr" >&2
    goto :download_done
)

echo   Retrying with best-effort revocation checking... >&2
curl -fsSL --ssl-revoke-best-effort "!DL_URL!" -o "!DL_OUTPUT!"
set "CURL_RESULT=!ERRORLEVEL!"
if !CURL_RESULT! neq 0 type "!DL_OUTPUT!.stderr" >&2

:download_done
del "!DL_OUTPUT!.stderr" >nul 2>&1
exit /b !CURL_RESULT!
