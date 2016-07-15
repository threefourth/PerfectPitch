CREATE DATABASE threefourths;
USE threefourths;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(50),
  first_name varchar(50),
  last_name varchar(50),
  email varchar(50),
  password varchar(50),
  average_score int
);

