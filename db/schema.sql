DROP DATABASE IF EXISTS employee_db;
-- Creates the "inventory_db" database --
CREATE DATABASE employee_db;

-- Makes it so all of th= following code will affect inventory_db --
USE employee_db;

-- Creates the table "produce" within inventory_db --
CREATE TABLE department (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(30) NOT NULL
);
-- Creates the table "produce" within inventory_db --
CREATE TABLE role (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  -- Makes a string column called "name" which cannot contain null --
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_ID INT NOT NULL
);
CREATE TABLE employee (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  -- Makes a string column called "name" which cannot contain null --
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
);

