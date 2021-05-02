const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");
const consoletable = require("console.table");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_db",
});

connection.connect(function(err) {
  if (err) throw err;
  begin();
});



function begin() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add Employee",
        "Add Role",
        "Add Department",
        "View Employee",
        "View Role",
        "View Department",
        "Update Employee Roles",
        "Exit",
      ]
    })

    .then(function(answer) {
      switch (answer.action) {
      case "Add Employee":
        addEmployee();
        break;

      case "Add Role":
        addRole();
        break;

      case "Add Department":
        addDepartment();
        break;

      case "View Employee":
        viewEmployee();
        break;

      case "View Role":
        viewRole();
        break;

      case "View Department":
        viewDepartment();
        break;

        case "Update Employee Roles":
        updateRoles();
        break;

       case "Exit":
        exit();
        break;
      }
    });
}

function viewEmployee() {
  var query = "SELECT first_name, last_name, title, salary, dept_name FROM employee INNER join role ON employee.role_id=role.id INNER join department ON role.department_id=department.id";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res)
    begin();
  });
}

function viewDepartment() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res)
      begin();
    });
  }

  function viewRole() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res)
      begin();
    });
  }


function addDepartment() {
  inquirer
    .prompt({
      name: "newDepartment",
      type: "input",
      message: "What Department Would You Like To Add?"
    })
    .then(function(answer) {
      var query = "INSERT INTO department (dept_name) VALUES (?) ";
      connection.query(query, answer.newDepartment , function(err, res) {
        if (err) throw err;
        viewDepartment();
      });
    });
}



function addEmployee() {
    inquirer
      .prompt( [{
        name: "employeeName",
        type: "input",
        message: "What is the employee name?"
      },

      {
        name: "employeeLastName",
        type: "input",
        message: "What is the employee last name?"
      },

      {
        name: "employeeRoleId",
        type: "input",
        message: "What is the employee role ID?"
      },
    ])
      .then(function(answer) {
        var query = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)";
        connection.query(query, [answer.employeeName, answer.employeeLastName, answer.employeeRoleId] , function(err, res) {
          if (err) throw err;
          viewEmployee();
        });
      });
  };


  function addRole() {
    inquirer
      .prompt( [{
        name: "employeeTitle",
        type: "input",
        message: "What is your title?"
      },

      {
        name: "employeeSalary",
        type: "input",
        message: "What is your salary?"
      },

      {
        name: "employeeDepartmentID",
        type: "input",
        message: "What is your department ID?"
      },
    ])
      .then(function(answer) {
        var query = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
        connection.query(query, [answer.employeeTitle, answer.employeeSalary, answer.employeeDepartmentID] , function(err, res) {
          if (err) throw err;
          viewRole();
        });
      });
  }

