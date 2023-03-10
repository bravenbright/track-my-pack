DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
   id INT PRIMARY KEY AUTO_INCREMENT,
   name VARCHAR(30) UNIQUE NOT NULL 
);

CREATE TABLE role (
   id INT PRIMARY KEY AUTO_INCREMENT,
   name VARCHAR(30) NOT NULL,
   salary DECIMAL,
   department_id INT,
   CONSTRAINT fk_role FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
   id INT PRIMARY KEY AUTO_INCREMENT, 
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_id INT,
   manager_id INT,
   birthdate DATE,
   empl_cake VARCHAR(30),
   CONSTRAINT fk_employee FOREIGN KEY (role_id) REFERENCES role(id)
);
