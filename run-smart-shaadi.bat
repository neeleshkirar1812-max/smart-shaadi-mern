@echo off
TITLE Smart Shaadi & SmartEvent Karo - Launcher
COLOR 0E

echo =======================================================================
echo          SMART SHAADI ^& SMARTEVENT KARO - LUXURY MERN PLATFORM
echo               Executive All-Faith Wedding Planning Platform
echo =======================================================================
echo.
echo [1/3] Verifying Node.js environment...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b
)

echo [OK] Node.js is active.
echo.
if not exist "%~dp0backend\node_modules" (
    echo [SETUP] Installing backend dependencies...
    cd /d "%~dp0backend" && call npm install
)
if not exist "%~dp0frontend\node_modules" (
    echo [SETUP] Installing frontend dependencies...
    cd /d "%~dp0frontend" && call npm install
)
echo.
echo [2/3] Launching Express Backend Server on port 5000...
start "Smart Shaadi Backend (Port 5000)" cmd /k "cd /d "%~dp0backend" && node server.js"

echo [3/3] Launching Vite Frontend Dev Server on port 5173...
start "Smart Shaadi Frontend (Port 5173)" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Waiting for servers to initialize...
timeout /t 3 /nobreak >nul

echo.
echo Opening Smart Shaadi in your default browser...
start http://localhost:5173

echo.
echo =======================================================================
echo   [SUCCESS] Smart Shaadi is now live!
echo   Frontend : http://localhost:5173
echo   Backend  : http://localhost:5000
echo   
echo   Demo Logins:
echo   - Couple : couple@smartshaadi.com   / couple123
echo   - Vendor : wedmoire@smartshaadi.com / vendor123
echo   - Admin  : admin@smartshaadi.com    / admin123
echo =======================================================================
echo.
echo Leave this window open, or close it anytime. Both server windows are running.
pause
