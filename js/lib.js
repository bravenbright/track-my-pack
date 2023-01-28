const inquirer = require('inquirer');

let viewDept = function () { };

function createDept(){
inquirer
   .prompt([{
      type: 'input',
      message: 'What is your department name?',
      value: 'deptName'
   }])
};



module.exports = { createDept };