// const connection = require("./connection.js");
const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql");
const consoletable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  initialize();
});

function viewDepartment() {
  const connector = connection.query(
    "SELECT * FROM department",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      initialize();
    }
  );
}

function viewEmployee() {
  const connector = connection.query(
`SELECT employee.first_name as 'First Name', employee.last_name as 'Last Name', title as 'Position', salary as 'Salary', deptname as 'Department Name', E.last_name as 'Manager'
FROM employee 
INNER JOIN role
ON employee.role_id = role.id
INNER JOIN department
ON role.department_id = department.id
INNER JOIN employee E 
ON employee.manager_id = E.id`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
      initialize();
    }
  );
}
function viewRole() {
  let connector = connection.query(`SELECT role.id, title, salary, deptname
  FROM role 
  INNER JOIN department 
  ON role.department_id = department.id`, function (err, res) {
    if (err) throw err;
    console.table(res);
    initialize();
  });
}

function addDepartment() {
  inquirer
    .prompt({
      name: "newDepartmentName",
      type: "input",
      message: "What is the name of the new department?",
    })
    .then(function (answer) {
      var query = connection.query(
        "INSERT INTO department (deptname) VALUES (?)",
        answer.newDepartmentName,
        function (err, res) {
          if (err) throw err;

          viewDepartment();
        }
      );
    });
}


function addEmployee() {
  inquirer
    .prompt([{
      name: "FirstName",
      type: "input",
      message: "What is the first name of the employee you want to add?",
    },
    {
    name: "LastName",
    type: 'input',
    message: "What is the last name of the new employee you want to add?"
    },
    {
    name: "RoleID",
    type: 'input',
    message: "What is the role ID of the new employee you want to add?"
    },
    {
    name: "ManagerID",
    type: 'input',
    message: "What is the Manager ID for the new employee you want to add?"
    }
  ])
    .then(function (answer) {
      var query = connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [answer.FirstName, answer.LastName, answer.RoleID, answer.ManagerID],
        function (err, res) {
          if (err) throw err;

          viewEmployee();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([{
      name: "Title",
      type: "input",
      message: "What is the title of the role you want to add?",
    },
    {
    name: "Salary",
    type: 'input',
    message: "What is the Salary for this role??"
    },
    {
    name: "DepartmentID",
    type: 'input',
    message: "What is the department ID for this role?"
    },
  ])
    .then(function (answer) {
      var query = connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [answer.Title, answer.Salary, answer.DepartmentID],
        function (err, res) {
          if (err) throw err;

          viewRole();
        }
      );
    });
}

function initialize() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Department",
        "View Employee",
        "View Role",
        "Update Employee Role",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "View Department":
          viewDepartment();
          break;

        case "View Employee":
          viewEmployee();
          break;

        case "View Role":
          viewRole();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
}