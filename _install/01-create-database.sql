

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema chat
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema chat
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `chat` DEFAULT CHARACTER SET utf8 ;
USE `chat` ;

-- -----------------------------------------------------
-- Table `chat`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chat`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `surname` VARCHAR(255) NULL,
  `password` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chat`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chat`.`messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `body` VARCHAR(45) NULL,
  `date` DATETIME NULL DEFAULT  NOW(),
  `sender_id` INT NULL,
  `receiver_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_sender_idx` (`sender_id` ASC),
  INDEX `fk_receiver_idx` (`receiver_id` ASC),
  CONSTRAINT `fk_sender`
    FOREIGN KEY (`sender_id`)
    REFERENCES `chat`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_receiver`
    FOREIGN KEY (`receiver_id`)
    REFERENCES `chat`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
