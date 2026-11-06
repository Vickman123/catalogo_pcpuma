@echo off
title Catalogo Tecnologico PC PUMA - UNAM
echo =======================================================
echo   CATALOGO INTERACTIVO PC PUMA - UNAM
echo   Iniciando servidor local y abriendo navegador...
echo =======================================================
cd /d "%~dp0"
start "" "http://localhost:5173/"
npm run dev
pause
