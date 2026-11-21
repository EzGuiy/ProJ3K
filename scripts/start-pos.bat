@echo off
REM Start MySQL (port 3308) and the POS web app. Keep both windows open.

start "MySQL 3308" "C:\Program Files\MySQL\MySQL Server 26.7\bin\mysqld.exe" --defaults-file=C:\Users\USER\mysql-pos-3308\my.ini --console
timeout /t 3 /nobreak >nul

start "POS Web" cmd /k "cd /d D:\POSPJ\ProJ3K\frontend && npm run dev"

echo.
echo MySQL 3308 and POS web app are starting.
echo Open http://localhost:3000/admin/menu
echo Close the two new windows to stop them.
