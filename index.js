#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];

if (!projectName) {
  console.error('Error: Please provide a project name');
  console.error('Usage: npx create-flashui my-awesome-app');
  process.exit(1);
}

if (fs.existsSync(projectName)) {
  console.error(`Error: Folder "${projectName}" already exists!`);
  process.exit(1);
}

console.log(`Creating FlashUI project: ${projectName} ...`);

// Copy everything from current folder (where create-flashui is) to new project
fs.cpSync(__dirname, projectName, { recursive: true });

// Remove node_modules from the new project (we don't want to copy it)
const nodeModulesPath = path.join(projectName, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  fs.rmSync(nodeModulesPath, { recursive: true, force: true });
}

console.log(`
Success! Your FlashUI app is ready!

Now run:

  cd ${projectName}
  npm install
  npm run dev

Start coding in the app/ folder — everything else is your framework!
`);