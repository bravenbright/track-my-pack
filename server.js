const inquirer = require('inquirer');
// import{createDept} from './lib';
const mysql = require('mysql2');
const db = require('./db/db');

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
         }
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
         case 'createDept':
            createEmployee();
            break;
         case 'createDept':
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
   inquirer.prompt([
      {
         type: 'input',
         message: 'What is your employee first name?',
         name: 'first_name',
         value: 'emplLastName'
      },
      {
         type: 'input',
         message: 'What is your employee last name?',
         name: 'last_name',
         value: 'emplFirstName'
      // should I asign a manger id or have them input one?
      }])
   .then((res) => {
      // idk if i need this but i didn't want the last name to override the first and t that's
      // what i though would happen here if I didn't creat a new variable i guess 
      let newEmplName = 'emplFirstName' + 'emplLastName';
      let dbRes = db.query('INSERT INTO employee SET ?', res, function (err) {
         if (err) {
            console.log(err);
         } else {
            console.log(`Employee "${res.name}" added to database.`);
            initialQuestion();
         }
       });
   })
};

function createRole() {
   inquirer.prompt([
      {
         type: 'input',
         message: 'What is the new role you would like to add?',
         name: 'title',
         value: 'roleName'
      },
      {
         type: 'input',
         
      }
      ])
   .then((res) => {
      let dbRes = db.query('INSERT INTO employee SET ?', res, function (err) {
         if (err) {
            console.log(err);
         } else {
            console.log(`Employee "${res.name}" added to database.`);
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
         console.log(result);
         initialQuestion();
      }
   })
};

initialQuestion();


