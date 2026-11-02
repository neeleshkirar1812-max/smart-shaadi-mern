# Smart Shaadi PowerShell Launcher
Write-Host "=======================================================================" -ForegroundColor DarkYellow
Write-Host "         SMART SHAADI & SMARTEVENT KARO - LUXURY MERN PLATFORM          " -ForegroundColor Yellow
Write-Host "              Executive All-Faith Wedding Planning Platform            " -ForegroundColor Yellow
Write-Host "=======================================================================" -ForegroundColor DarkYellow
Write-Host ""

$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "[1/3] Verifying Node.js environment..." -ForegroundColor Cyan
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Node.js is not installed or not in PATH!" -ForegroundColor Red
    Read-Host "Press Enter to exit..."
    exit
}
Write-Host "[OK] Node.js is active." -ForegroundColor Green
Write-Host ""

if (-not (Test-Path "$baseDir\backend\node_modules")) {
    Write-Host "[SETUP] Installing backend dependencies..." -ForegroundColor Yellow
    Push-Location "$baseDir\backend"
    npm install
    Pop-Location
}
if (-not (Test-Path "$baseDir\frontend\node_modules")) {
    Write-Host "[SETUP] Installing frontend dependencies..." -ForegroundColor Yellow
    Push-Location "$baseDir\frontend"
    npm install
    Pop-Location
}
Write-Host ""

Write-Host "[2/3] Launching Express Backend Server on port 5000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$baseDir\backend'; node server.js"

Write-Host "[3/3] Launching Vite Frontend Dev Server on port 5173..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$baseDir\frontend'; npm run dev"

Write-Host "Waiting 3 seconds for server initialization..." -ForegroundColor Gray
Start-Sleep -Seconds 3

Write-Host "Opening Smart Shaadi in your default browser..." -ForegroundColor Green
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "=======================================================================" -ForegroundColor DarkYellow
Write-Host "  [SUCCESS] Smart Shaadi is now live!" -ForegroundColor Green
Write-Host "  Frontend : http://localhost:5173" -ForegroundColor White
Write-Host "  Backend  : http://localhost:5000" -ForegroundColor White
Write-Host "  1-Click Demo Switcher available in bottom-left corner." -ForegroundColor Yellow
Write-Host "=======================================================================" -ForegroundColor DarkYellow
Write-Host ""
