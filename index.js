const inquirer = require('inquirer');
const fs = require('fs')
const questions = [
    {
        name:'userName',
        message:'Whats the name of your github username?'
    },
    {
        name:'email',
        message:'Whats the name of your github email?'
    },
    {
        name:'projTitle',
        message:'Whats the name of your project?'
    },
    {
        name:'description',
        message:'Provide a description of project?'
    },
    {
        name:'installation',
        message:'Whats the installation process?'
    },
    {
        name:'credits',
        message:'Who would you like to credit?'
    },
    {
        name:'licenses',
        message:'What licences are used?'
    },
    {
        name:'features',
        message:'What are some main features?'
    },

    {
        name:'tests',
        message:'Testing results?'
    },


  ]
  const templateGenerator = (name,email,title,desc,inst,cred,lic,feat,test) => {
      const newFile = `${title}.md`;
      const info = `# ${title}

      ## Description
       ${desc}
       
      ## Table of Contents
    
      - [Installation](#installation)
      - [Usage](#usage)
      - [Credits](#credits)
      - [License](#license)
      - [Questions](#quesions)

      ## Installation
       ${inst}

      ## Usage
      Provide instructions and examples for use. Include screenshots as needed.
      To add a screenshot, create an 'assets/images' folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:
          ``md
          ![alt text](assets/images/screenshot.png)
          ``
      ## Credits
       ${cred}

      ## License
       ${lic}
      
      ## Badges
      ![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
      Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.

      ## Features
       ${feat}

      ## How to Contribute
       https://github.com/${name}/

      ## Tests
      ${test}

      ## Questions
        email me at ${email}
      `
      fs.appendFile(newFile,info,(err) =>
      err ? console.error(err) : console.log('Commit logged!'))
  }
inquirer
  .prompt(questions)
  .then((answers) => {
    templateGenerator(answers.name,answers.email,answers.projTitle,answers.description,answers.installation,answers.credits,answers.licenses)
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log(error);
    } else {
      // Something else went wrong
      console.log('Something else went wrong');
    }
  });