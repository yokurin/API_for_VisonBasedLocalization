-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema gojo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema gojo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `visionbased` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `visionbased` ;

-- -----------------------------------------------------
-- Table `visionbased`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visionbased`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT,
  `uuid` VARCHAR(255) NOT NULL COMMENT 'uuid',
  `last_logined` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新日時',
  PRIMARY KEY (`id`)  COMMENT '',
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)  COMMENT '');


-- -----------------------------------------------------
-- Table `visionbased`.`form`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visionbased`.`form` (
  `uuid` INT NOT NULL COMMENT 'UUID',
  `name` VARCHAR(255) NOT NULL COMMENT 'name',
  `sex` VARCHAR(20) NOT NULL COMMENT 'sex',
  `useful` INT NOT NULL COMMENT '使いやすさ',
  `joyful` INT NOT NULL COMMENT '楽しさ',
  `opinion` VARCHAR(512) NOT NULL COMMENT '意見');
