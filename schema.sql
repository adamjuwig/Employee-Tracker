DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT,
dept_name VARCHAR(30) NULL,
PRIMARY KEY (id)
);

CREATE TABLE role(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(40) NULL,
salary DECIMAL(10,2) NULL,
department_id INT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NULL,
last_name VARCHAR(30) NULL,
department_id INT NULL,
manager_id INT NULL,
role_id INT NULL,
PRIMARY KEY (id)
);