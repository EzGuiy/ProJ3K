@echo off
REM Start the local MySQL instance used by the POS app (port 3308, database restaurant_pos)
start "MySQL 3308" "C:\Program Files\MySQL\MySQL Server 26.7\bin\mysqld.exe" --defaults-file=C:\Users\USER\mysql-pos-3308\my.ini --console
echo MySQL 3308 started (data: C:\Users\USER\mysql-pos-3308\data)
