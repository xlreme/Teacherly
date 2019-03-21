# 1. Create DataBase first
CREATE SCHEMA IF NOT EXISTS `teacherly` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci 

# 2. Create the tables 
CREATE TABLE IF NOT EXISTS `teacherly`.`teachersandstudents` (
  `TeacherEmail` VARCHAR(500) CHARACTER SET 'latin1' NOT NULL,
  `StudentEmail` VARCHAR(500) CHARACTER SET 'latin1' NOT NULL,
  `CreatedDt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ModifiedDt` DATETIME NULL DEFAULT NULL,
  `Suspended` BIT(1) NULL DEFAULT b'0',
  PRIMARY KEY (`TeacherEmail`, `StudentEmail`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1

# 3. Set ModifiedDT as on update
ALTER TABLE `teacherly`.`teachersandstudents` 
CHANGE COLUMN `ModifiedDt` `ModifiedDt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ;


# (Optional) Give root user legacy access using password if require
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Password3'
