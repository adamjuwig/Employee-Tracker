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
  
INSERT INTO department (dept_name)
VALUES ("Sales"),("Engineering"),("Finance"),("Legal");

INSERT INTO role(title,salary,department_id)
VALUES 
("Sales Lead", 100000, 1),
("Sales Representative", 80000, 1),
("Mechanical Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Jordan", "Belfort", 1, 3),
("Joe", "Dirt", 2, 1),
("Nancy", "Botwin", 3, NULL),
("Omar", "Little", 4, 3),
("Peggy", "Olson", 5, NULL),
("Lucille", "Blythe", 6, NULL),
("Charlie", "Kelly", 7, 6),
("April", "Ludgate", 3, 2);

  