@echo off
TITLE ANIMUS_ASTREON_OS_BOOT_V3.12
COLOR 0B

echo ###############################################################################
echo #             ANIMUS_ASTREON_PROJECT_V3.12 // SYSTEMS ARCHITECT INTERFACE
echo #             SYSTEM_INITIALIZATION_PROTOCOL...
echo ###############################################################################
echo.
echo [SYSTEM_STATUS]: INITIALIZING_NEURAL_UPLINK
echo [DIRECTORY]: f:\Animus Portfolio 2nd Try\Animus-Portfolio_v2-main\frontend
echo.

:: Check for node_modules
if not exist "f:\Animus Portfolio 2nd Try\Animus-Portfolio_v2-main\frontend\node_modules" (
    echo [ERROR]: node_modules_not_found. Run "npm install" first.
    pause
    exit
)

echo [READY]: COMMENCING_UPLINK_IN_3...
timeout /t 1 >nul
echo [READY]: 2...
timeout /t 1 >nul
echo [READY]: 1...
timeout /t 1 >nul

cd /d "f:\Animus Portfolio 2nd Try\Animus-Portfolio_v2-main\frontend"
npm start

pause
