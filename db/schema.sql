DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
   id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   name VARCHAR(30) NOT NULL 
);

CREATE TABLE role (
   id INT PRIMARY KEY,
   title VARCHAR(30) NOT NULL,
   salary DECIMAL,
   deparment_id INT
);

CREATE TABLE employee (
   id INT PRIMARY KEY, 
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_id INT,
   manager_id INT
);