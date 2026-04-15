@echo off
echo ========================================
echo   Clip Crafters Portfolio - Dev Server
echo ========================================
echo.

set PATH=C:\Program Files\nodejs;%PATH%

echo [1/2] Starting Backend (port 5000)...
start "Backend - Clip Crafters" cmd /k "set PATH=C:\Program Files\nodejs;%PATH% && cd /d %~dp0backend && node server.js"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend (port 5173)...
start "Frontend - Clip Crafters" cmd /k "set PATH=C:\Program Files\nodejs;%PATH% && cd /d %~dp0frontend && npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   Both servers are starting...
echo.
echo   Portfolio:  http://localhost:5173
echo   Admin:      http://localhost:5173/admin/login
echo   API Health: http://localhost:5000/api/health
echo ========================================
echo.
echo   Admin Login:
echo   Email:    bhumilprajapati4@gmail.com
echo   Password: 3004
echo ========================================
pause
