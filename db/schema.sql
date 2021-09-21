DROP DATABASE IF EXISTScomment techblog_db;
CREATE DATABASE techblog_db;

CREATE TABLE `techblog_db`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(64) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
PRIMARY KEY (`id`));

CREATE TABLE `techblog_db`.`comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` BLOB NOT NULL,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
PRIMARY KEY (`id`));

CREATE TABLE `techblog_db`.`post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(64) NOT NULL,
  `content` BLOB NOT NULL,
  `user_id` INT NOT NULL,
PRIMARY KEY (`id`));