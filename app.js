const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const employees = [];

function createTeam() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "employeeTitle",
        message: "Select Employee Title",
        choices: ["Engineer", "Manager", "Intern"],
      },
      {
        type: "input",
        name: "name",
        message: "What is the Name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the Email Address?",
      },
    ])
    .then((data) => {
      const { employeeTitle } = data;
      switch (employeeTitle) {
        case "Engineer":
          createEngineer(data);
          break;
        case "Manager":
          createManager(data);
          break;
        case "Intern":
          createIntern(data);
          break;
        default:
          completedTeam();
          break;
      }
    });
}

function createEngineer(employeeInfo) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "github",
        message: "What is their Github?",
      },
      {
        type: "confirm",
        name: "additionalEmployees",
        message: "Would you like to add more emplotees?",
      },
    ])
    .then((data) => {
      const { name, id, email } = employeeInfo;
      const { github } = data;

      const newEngineer = new Engineer(name, id, email, github);
      employees.push(newEngineer);
      if (data.additionalEmployees) {
        createTeam();
      } else {
        completedTeam();
      }
    });
}

function createManager(employeeInfo) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "officeNumber",
        message: "What is the Office Number?",
      },
      {
        type: "confirm",
        name: "additionalEmployees",
        message: "Would you like to add more emplotees?",
      },
    ])
    .then((data) => {
      const { name, id, email } = employeeInfo;
      const { officeNumber } = data;

      const newManager = new Manager(name, id, email, officeNumber);
      employees.push(newManager);
      if (data.additionalEmployees) {
        createTeam();
      } else {
        completedTeam();
      }
    });
}

function createIntern(employeeInfo) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "school",
        message: "What is the School?",
      },
      {
        type: "confirm",
        name: "additionalEmployees",
        message: "Would you like to add more emplotees?",
      },
    ])
    .then((data) => {
      const { name, id, email } = employeeInfo;
      const { school } = data;

      const newIntern = new Intern(name, id, email, school);
      employees.push(newIntern);
      if (data.additionalEmployees) {
        createTeam();
      } else {
        completedTeam();
      }
    });
}

function completedTeam() {
  fs.writeFile(outputPath, render(employees), (err, data) => {
    console.log("Successful");
  });
}

createTeam();
