const inquirer = require('inquirer');
const fs = require('fs')
const questions = [
    {
        type:'input',
        name:'userName',
        message:'Whats the name of your github username?'
    },
    {   
        type:'input',
        name:'email',
        message:'Whats the name of your github email?'
    },
    {
        type:'input',
        name:'projTitle',
        message:'Whats the name of your project?'
    },
    {
        type:'input',
        name:'description',
        message:'Provide a description of project?'
    },
    {
        type:'input',
        name:'installation',
        message:'Whats the installation process?'
    },
    {
        type:'input',
        name:'credits',
        message:'Who would you like to credit?'
    },
    {
        type:'input',
        name:'licenses',
        message:'What licences are used?'
    },
    {
        type:'input',
        name:'features',
        message:'What are some main features?'
    },

    {
        type:'input',
        name:'tests',
        message:'Testing results?'
    },


  ]

inquirer
  .prompt(questions)
  .then((answers) => { 
    //   answers.userName,answers.email,answers.projTitle,answers.description,answers.installation,answers.credits,answers.licenses,answers.features,answers.tests
    
    const newFile = `${answers.projTitle}-README.md`;
    const readMeFile = `# ${answers.projTitle}

## Description
 ${answers.description}
       
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
         
  ![alt text](assets/images/screenshot.png)
          
## Credits
 ${answers.credits}

## License
 ${answers.licenses}
      
## Badges
 ![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
 Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.

 ## Features
       

## How to Contribute
 https://github.com/${answers.userName}/

## Tests
      

## Questions
 email me at [Email](mailto:${answers.email})
      `
      fs.appendFile(newFile,readMeFile,(err) =>
      err ? console.error(`Error appending to file \n ${err}`) : console.log('Successfully created README file. Just copy file into project'))
    
    // 
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