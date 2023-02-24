const inquirer = require("inquirer");
const fs = require("fs");

// Prompt user for input
inquirer
  .prompt([
    {
      type: "input",
      name: "projectTitle",
      message: "Enter the title of your project:",
    },
    {
      type: "input",
      name: "description",
      message: "Enter a description of your project:",
    },
    {
      type: "input",
      name: "installationInstructions",
      message: "Enter installation instructions:",
    },
    {
      type: "input",
      name: "usageInformation",
      message: "Enter usage information:",
    },
    {
      type: "input",
      name: "contributionGuidelines",
      message: "Enter contribution guidelines:",
    },
    {
      type: "input",
      name: "testInstructions",
      message: "Enter test instructions:",
    },
    {
      type: "list",
      name: "license",
      message: "Select a license for your project:",
      choices: [
        "MIT",
        "Apache 2.0",
        "GNU GPL v3",
      ],
    },
    {
      type: "input",
      name: "githubUsername",
      message: "Enter your GitHub username:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter your email address:",
    },
  ])
  .then((answers) => {
    // Generate the license badge URL based on the selected license
    let licenseBadgeUrl;
    switch (answers.license) {
      case "MIT":
        licenseBadgeUrl = "https://img.shields.io/badge/License-MIT-yellow.svg";
        break;
      case "Apache 2.0":
        licenseBadgeUrl = "https://img.shields.io/badge/License-Apache%202.0-blue.svg";
        break;
      case "GNU GPL v3":
        licenseBadgeUrl = "https://img.shields.io/badge/License-GPLv3-blue.svg";
        break;
    }

    // Create the contents of the README.md file
    const readmeContents = `# ${answers.projectTitle}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installationInstructions}

## Usage
${answers.usageInformation}

## License
[![License](${licenseBadgeUrl})](${getLicenseLink(answers.license)})

This project is covered under the ${answers.license} license.

## Contributing
${answers.contributionGuidelines}

## Tests
${answers.testInstructions}

## Questions
For additional questions, you can reach me on GitHub at [${answers.githubUsername}](https://github.com/${answers.githubUsername})
or via email at ${answers.email}.
`;

    // Write the contents to a README.md file
    fs.writeFile("README.md", readmeContents, (err) => {
      if (err) throw err;
      console.log("README.md file created successfully!");
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Helper function to get the license link
// Helper function to get the license link
function getLicenseLink(license) {
    switch (license) {
      case "MIT":
        return "https://opensource.org/licenses/MIT";
      case "Apache 2.0":
        return "https://opensource.org/licenses/Apache-2.0";
      case "GNU GPL v3":
        return "https://www.gnu.org/licenses/gpl-3.0.en.html";
      default:
        return "";
    }
  }
  