const inquirer = require ("inquirer");
const db = require ('./db/connection')
function startApp() {
  // prompt the list questions/inquires!
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "What would you like to do?",
          choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
            "Quit",
          ],
        },
      ])
      .then((options) => {
        switch (options.choice) {
          case "View all departments":
            viewDepts();
            break;
  
          case "View all roles":
            viewRoles();
            break;
  
          case "View all employees":
            viewEmployees();
            break;
  
          case "Add a department":
            addDepartment();
            break;
  
          case "Add a role":
            addRole();
            break;
  
          case "Add an employee":
            addEmployee();
            break;
  
          case "Update an employee role":
            updateEmployee();
            break;
  
          case "Quit":
            db.close();
        }
      });
  }
  function viewEmployees() {
    const sql = `SELECT employee.id, employee.first_name AS "first name", employee.last_name 
                      AS "last name", role.title, department.name AS department, role.salary, 
                      concat(manager.first_name, " ", manager.last_name) AS manager
                      FROM employee
                      LEFT JOIN role
                      ON employee.role_id = role.id
                      LEFT JOIN department
                      ON role.department_id = department.id
                      LEFT JOIN employee manager
                      ON manager.id = employee.manager_id`
    db.query(sql, (err, rows) => {
      if (err) console.log(err)
      console.table(rows)
      startApp()
    })
  };
  function viewDepts() {
    const sql = `SELECT * FROM department`
    db.query(sql, (err, rows) => {
      if (err) console.log(err)
      console.table(rows)
      startApp()
    })    
  };
  function viewRoles() {
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department
                      FROM role
                      LEFT JOIN department
                      ON role.department_id = department.id`
    db.query(sql, (err, rows) => {
      if (err) console.log(err)
      console.table(rows)
      startApp()
    })
  };
  function addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "deptName",
          message: "What is the name of the department?",
        },
      ])
      .then((answer) => {
        const sql = `INSERT INTO department (name) VALUES (?)`
        db.query(sql, answer.deptName, (err, result) => {
          if (err) console.log(err)
          console.log("Department added!")
          startApp()
        })
      })
  };
  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "roleName",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "roleSalary",
          message: "What is the salary of the role?",
        },
        {
          type: "input",
          name: "roleDept",
          message: "What is the department ID of the role?",
        },
      ])
      .then((answer) => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
        db.query(sql, [answer.roleName, answer.roleSalary, answer.roleDept], (err, result) => {
          if (err) console.log(err)
          console.log("Role added!")
          startApp()
        })
      })
  };
  function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?",
        },
        {
          type: "input",
          name: "roleId",
          message: "What is the employee's role_id?",
        },
        {
          type: "input",
          name: "managerId",
          message: "What is the employee's manager ID?",
        },
      ])
      .then((answer) => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
        db.query(sql, [answer.firstName, answer.lastName, answer.roleId, answer.managerId], (err, result) => {
          if (err) console.log(err)
          console.log("Employee added!")
          startApp()
        })
      })
  };
  function updateEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "employeeId",
          message: "What is the ID of the employee you would like to update?",
        },
        {
          type: "input",
          name: "roleId",
          message: "What is the new role ID of the employee?",
        },
      ])
      .then((answer) => {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
        db.query(sql, [answer.roleId, answer.employeeId], (err, result) => {
          if (err) console.log(err)
          console.log("Employee updated!")
          startApp()
        })
      })
  };
  startApp();