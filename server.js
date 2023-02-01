const inquirer = require('inquirer');
// import{createDept} from './lib';
const mysql = require('mysql2');
const db = require('./db/db');
const fs = require('fs');
const cTable = require('console.table');
require("dotenv").config();

let title = `
████████ ██████   █████   ██████ ██   ██     ███    ███ ██    ██     ██████   █████   ██████ ██   ██ 
   ██    ██   ██ ██   ██ ██      ██  ██      ████  ████  ██  ██      ██   ██ ██   ██ ██      ██  ██  
   ██    ██████  ███████ ██      █████       ██ ████ ██   ████       ██████  ███████ ██      █████   
   ██    ██   ██ ██   ██ ██      ██  ██      ██  ██  ██    ██        ██      ██   ██ ██      ██  ██  
   ██    ██   ██ ██   ██  ██████ ██   ██     ██      ██    ██        ██      ██   ██  ██████ ██   ██
`;

const initialQuestion = () => {
   inquirer.prompt([{
      type: 'list',
      name: 'initialQuestion',
      message: title + "\n What would you like?",
      choices: [
         {
            name: 'View all departments',
            value: 'viewDepts'
         },
         {
            name: 'View all employees',
            value: 'viewEmpl'
         },
           {
            name: 'View all roles',
            value: 'viewRoles'
         },
         {
            name: 'Create new department',
            value: 'createDept'
         },
         {
            name: 'Create a new employee',
            value: 'createEmpl'
         },
         {
            name: 'Create a new role',
            value: 'createRole'
         },
         {
            name: 'Update a department',
            value: 'updateDept'
         },
         {
            name: 'Update employee',
            value: 'UpdateEmpl'
         },
         {
            name: 'Update role',
            value: 'updateRole'
         }
      ]
   }])
   .then((res) => {
      switch(res.initialQuestion) {
         case 'viewDepts':
            viewTable('department');
            break;
         case 'viewEmpl':
            viewTable('employee');
            break;
         case 'viewRoles':
            viewTable('role');
            break;
            // not sure if this is the proper place for these
         case 'createDept':
            createDept();
            break;
         case 'createEmpl':
            createEmployee();
            break;
         case 'createRole':
            createRole();
            break;
         default:
            console.log(`Sorry, but ${res.initialQuestion} has not yet been coded.`)
            initialQuestion();
       }
   })
}
// .then to call the functions to activate the actions of promts that were chosen
function createDept() {
   inquirer.prompt([{
      type: 'input',
      message: 'What is your department name?',
      name: 'name',
      value: 'deptName'
   }])
   .then((res) => {
      let dbRes = db.query('INSERT INTO department SET ?', res, function (err) {
         if (err) {
            console.log(err);
         } else {
            console.log(`Department "${res.name}" added to database.`);
            initialQuestion();
         }
       });
   })
};

function createEmployee() {
   let roleChoices = []; 
   db.query('SELECT * FROM role', function (err, result) {
      if (err) {
         console.log(err);
      } else {
         for( var i = 0; i < Object.keys(result).length; i++){
            roleChoices.push({
                  name: result[i].name,
                  value: result[i].id
            });
         }
      }
   })
   let managerChoices = []; 
   db.query('SELECT * FROM employee', function (err, result) {
      if (err) {
         console.log(err);
      } else {
         for( var i = 0; i < Object.keys(result).length; i++){
            managerChoices.push({
                  name: `${result[i].first_name} ${result[i].last_name}` ,
                  value: result[i].id
            });
         }
      }
   })
   inquirer.prompt([
      {
         type: 'input',
         message: 'What is your employee first name?',
         name: 'first_name',
         value: 'emplFirstName'
      },
      {
         type: 'input',
         message: 'What is your employee last name?',
         name: 'last_name',
         value: 'emplLastName'
      },
      {  type: 'list',
         message: 'What is your employee role',
         name: 'role_id',
         value: 'emplRole',
         choices: roleChoices
      },
      {
         type: 'list',
         message: 'What is the manager id?',
         name: 'manager_id',
         value: 'managerId',
         choices: managerChoices
      },
      {
         type: 'datepicker',
         message: 'What is employee birthday in YYYY-MM-DD format?',
         name: 'birthdate',
         value: 'emplBirthday',
         format: ['YYYY', '-', 'MM', '-', 'DD']
      },
      {
         type: 'input',
         message: 'What is your favorite cake flavor?',
         name: 'empl_cake',
         value: 'emplCake',
      }])
   .then((res) => {
      let dbRes = db.query('INSERT INTO employee SET ?', res, function (err) {
         if (err) {
            console.log(err);
         } else {
            console.log(`Employee "${res.first_name} ${res.last_name}" added to database.`);
            initialQuestion();
         }
       });
   })
};

function createRole() {
   let deptChoices = [];
   db.query('SELECT * FROM department', function (err, result) {
      if (err) {
         console.log(err);
      } else {
         for( var i = 0; i < Object.keys(result).length; i++){
            deptChoices.push({
                  name: result[i].name,
                  value: result[i].id
            });
         }
      }
   })
   inquirer.prompt([
      
      {
         type: 'input',
         message: 'What is the title of the role you would like to add?',
         name: 'name',
         value: 'roleName'
      },
      {
         type: 'list',
         message: 'Select the department for this role',
         name: 'department_id',
         value: 'newDeptRole',
         choices: deptChoices
      },
      {
         type: 'number',
         message: 'What is the salary of this role?',
         name: 'salary',
         value: 'newRoleSalary'
      }
   ])
   .then((res) => {
      let dbRes = db.query('INSERT INTO role SET ?', res, function (err) {
         if (err) {
            console.log(err);
         } else {
            console.log(`Role "${res.name}" added to database.`);
            initialQuestion();
         }
       });
   })
};


function viewTable(tableName) {
   db.query('SELECT * FROM ??', tableName, function (err, result) {
      if (err) {
         console.log(err);
      } else {
         console.table(result);
         initialQuestion();
      }
   })
};

initialQuestion();
