-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema nrgweb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema nrgweb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `nrgweb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `nrgweb` ;

-- -----------------------------------------------------
-- Table `nrgweb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nrgweb`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idusers_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nrgweb`.`parking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nrgweb`.`parking` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `validation_status` TINYINT NOT NULL,
  `users_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_parking_users_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_parking_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `nrgweb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
