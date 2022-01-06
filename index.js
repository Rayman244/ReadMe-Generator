
const inquirer = require('inquirer');
const fs = require('fs')
const licenseMit = require('./licenses/mit')
const questions = [
    {
        type:'input',
        name:'userName',
        message:'Whats the name of your github username?',
        default: 'Username'
    },
    {   
        type:'input',
        name:'email',
        message:'Whats the name of your github email?',
        default: 'Email'
    },
    {
        type:'input',
        name:'projTitle',
        message:'Whats the name of your project?',
        default: 'Title'
    },
    {
        type:'input',
        name:'description',
        message:'Provide a description of project?',
        default: 'Description'
    },
    {
        type:'input',
        name:'installation',
        message:'Whats the installation process?',
        default: 'Installation'
    },
    {
        type:'input',
        name:'credits',
        message:'Who would you like to credit?',
        default: 'Credits'
    },
    {
        type:'list',
        name:'licenses',
        message:'What licences are used?',
        default: 'MIT',
        choices:['GNU AGPLv3','GNU GPLv3','GNU LGPLv3','Mozilla Public 2.0','Apache 2.0','MIT','Boost Software 1.0', 'The Unilicenst']
    },
    {
        type:'input',
        name:'features',
        message:'What are some main features?',
        default: 'Features'
    },

    {
        type:'input',
        name:'tests',
        message:'Testing results?',
        default: 'Tests'
    },


  ]
  const templateGenerator = (answers) =>{
      return `# ${answers.projTitle}

## Description
 ${answers.description}

 ![License](https://img.shields.io/badge/license-${answers.licenses}-lightgrey)
             
## Table of Contents
          
 - [Installation](#installation)
 - [Usage](#usage)
 - [Credits](#credits)
 - [License](#license)
 - [Questions](#quesions)
      
## Installation
 ${answers.installation} 
      
## Usage
 Provide instructions and examples for use. Include screenshots as needed.
 To add a screenshot, create an 'assets/images' folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:
        '''       
        ![alt text](assets/images/screenshot.png)
        '''    

## Credits
 ${answers.credits}
      
## License
 ${getLicense(answers.licenses,answers.name)}
            
## Badges
 ![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
 Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.
      
## Features
 ${answers.features}
 
## How to Contribute
 https://github.com/${answers.userName}/${answers.projTitle}
      
## Tests
 ${answers.tests}     
      
 ## Questions
 message me on Github https://github.com/${answers.userName}/
 email me at [${answers.email}](mailto:${answers.email})
 
 `
  }
  const getLicense = (type) =>{

      switch(type){
        // case 'GNU AGPLv3': ;
        // break;
        // case 'GNU GPLv3': ; 
        // break;
        // case 'GNU LGPLv3':;
        // break;
        // case 'Mozilla Public 2.0':;
        // break;
        // case 'Apache 2.0':;
        // break;
        // case 'Boost Software 1.0':;
        // break;
        // case 'The Unilicenst' : ;
        // break;
        default: return licenseMit.mitLicense();
      }
  }
inquirer
  .prompt(questions)
  .then((answers) => { 
    
    const newFile = `${answers.projTitle}-README.md`;
    
      fs.appendFile(newFile,templateGenerator(answers),(err) =>
      err ? console.error(`Error appending to file \n ${err}`) : console.log('Successfully created README file. Just copy file into project'))
    
    
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