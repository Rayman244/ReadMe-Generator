const inquirer = require("inquirer");
const fs = require("fs");
const licenseMit = require("./licenses/mit");
const gnuAgpl = require("./licenses/gnuAGPL");
const gnuGpl = require("./licenses/gnuGPL");
const gnuLgpl = require("./licenses/gnuLGPL");
const mozilla = require("./licenses/mozilla");
const apache = require("./licenses/apache");
const boost = require("./licenses/boost");
const unilicense = require("./licenses/uni");

const curYear = new Date().getFullYear();
const questions = [
  {
    type: "input",
    name: "userName",
    message: "Whats the name of your github username?",
    default: "Username",
  },
  {
    type: "input",
    name: "email",
    message: "Whats the name of your github email?",
    default: "Email",
  },
  {
    type: "input",
    name: "projTitle",
    message: "Whats the name of your project?",
    default: "Title",
  },
  {
    type: "input",
    name: "description",
    message: "Provide a description of project?",
    default: "Description",
  },
  {
    type: "input",
    name: "installation",
    message: "Whats the installation process?",
    default: "Installation",
  },
  {
    type: "input",
    name: "credits",
    message: "Who would you like to credit?",
    default: "Credits",
  },
  {
    type: "list",
    name: "licenses",
    message: "What licences are used?",
    default: "MIT",
    choices: [
      "GNU AGPLv3",
      "GNU GPLv3",
      "GNU LGPLv3",
      "Mozilla Public 2.0",
      "Apache 2.0",
      "MIT",
      "Boost Software 1.0",
      "The Unilicenst",
    ],
  },
  {
    type: "checkbox",
    name: "badges",
    message: "would you like to add badges?",
    default: "None",
    choices: ["None", "JavaScript", "HTML", "CSS", "JQuery", "Materialize"],
  },

  {
    type: "input",
    name: "features",
    message: "What are some main features?",
    default: "Features",
  },

  {
    type: "input",
    name: "tests",
    message: "Testing results?",
    default: "Tests",
  },
];
const templateGenerator = ({
  userName,
  email,
  projTitle,
  description,
  installation,
  credits,
  licenses,
  badges,
  features,
  tests,
}) => {
  return `# ${projTitle}

## Description
 ${description}

 ![License](https://img.shields.io/badge/license-${licenses}-lightgrey)
             
## Table of Contents
          
 - [Installation](#installation)
 - [Usage](#usage)
 - [Credits](#credits)
 - [License](#license)
 - [Questions](#quesions)
      
## Installation
 ${installation} 
      
## Usage
 Provide instructions and examples for use. Include screenshots as needed.
 To add a screenshot, create an 'assets/images' folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:
        '''       
        ![alt text](assets/images/screenshot.png)
        '''    

## Credits
 ${credits}
      
## License
 ${getLicense(licenses, curYear)}
            
## Badges
${addBadges(badges)}


      
## Features
 ${features}
 
## How to Contribute
 https://github.com/${userName}/${projTitle}
      
## Tests
 ${tests}     
      
 ## Questions
 message me on Github https://github.com/${userName}/
 email me at [${email}](mailto:${email})
 
 `;
};
const getLicense = (type, year) => {
  switch (type) {
    case "GNU AGPLv3":
      return gnuAgpl.gnuAgplLicense(year);
      break;
    case "GNU GPLv3":
      return gnuGpl.gnuGpl(year);
      break;
    case "GNU LGPLv3":
      return gnuLgpl.gnuLGPL(year);
      break;
    case "Mozilla Public 2.0":
      return mozilla.mozillaLicense();
      break;
    case "Apache 2.0":
      return apache.apacheLicense(year);
      break;
    case "Boost Software 1.0":
      return boost.boost();
      break;
    case "The Unilicenst":
      return unilicense.unilicense;
      break;
    default:
      return licenseMit.mitLicense(year);
  }
};
const addBadges = (badges) => {
    let badgeList = []
    badges.forEach(badge => {
        switch (badge) {
                  case "JavaScript": badgeList.push(`
![Javascript-Badge](https://img.shields.io/badge/Code-Javascript-yellow)`) ;
                      break;
                      case "HTML": badgeList.push(`
![HTML-Badge](https://img.shields.io/badge/Code-HTML-%23DA391E)`);
                      break;
                      case "CSS":  badgeList.push(`
![CSS-Badge](https://img.shields.io/badge/Code-CSS-blue)`);
                      break;
                      case "JQuery": badgeList.push(`
![jQuery](https://img.shields.io/badge/Code-jQuery-blue)`);
                      break;
                      case "Materialize": badgeList.push( `
![Materialize](https://img.shields.io/badge/Code-Materialize-green)`);
                      break;
                      
                  default:;
                      break;
              }
    }); 
    return badgeList
    
    
};

inquirer
  .prompt(questions)
  .then((answers) => {
    const newFile = `${answers.projTitle}-README.md`;

    fs.appendFile(newFile, templateGenerator(answers), (err) =>
      err
        ? console.error(`Error appending to file \n ${err}`)
        : console.log(
            "Successfully created README file. Just copy file into project"
          )
    );
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("Error 1", error);
    } else {
      // Something else went wrong
      console.log("Error 2", error);
    }
  });
