@echo off
TITLE ANIMUS_NEURAL_UPLINK_SETUP_V4.0
COLOR 1F

echo ###############################################################################
echo #             ANIMUS_ASTREON_PROJECT_V3.12 // SYSTEMS ARCHITECT INTERFACE
echo #             NEURAL_UPLINK_SETUP_PROTOCOL...
echo ###############################################################################
echo.
echo [SYSTEM_STATUS]: RECONSTRUCTING_LINK_METADATA...
echo [DIRECTORY]: f:\Animus Portfolio 2nd Try\Animus-Portfolio_v2-main\frontend
echo.

cd /d "f:\Animus Portfolio 2nd Try\Animus-Portfolio_v2-main\frontend"

echo [ACTION]: INITIALIZING_NPM_INSTALL...
echo [NOTE]: This process integrates the AnimusVoid and NeuralGrid engines.
echo.

call npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR]: UPLINK_INSTALL_FAILED. Check your internet connection or node version.
    pause
    exit
)

echo.
echo [SUCCESS]: NEURAL_UPLINK_RESTORED.
echo [ACTION]: STARTING_SYSTEM_CORE...
echo.

call npm start

pause
