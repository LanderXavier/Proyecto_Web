# Proyecto_Web
# borrar todo 

docker compose exec mysql_db1 mysql -u root -prootpassword proyecto -e "DELETE FROM Program; DELETE FROM Signature;"
ALTER TABLE Signature AUTO_INCREMENT = 1;