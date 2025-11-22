#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];

if (!projectName) {
  console.error('Usage: npx flashui my-app');
  process.exit(1);
}

if (fs.existsSync(projectName)) {
  console.error(`Folder "${projectName}" already exists!`);
  process.exit(1);
}

console.log(`Creating FlashUI project: ${projectName} ...`);
fs.cpSync(__dirname, projectName, { recursive: true });

const nodeModulesPath = path.join(projectName, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  fs.rmSync(nodeModulesPath, { recursive: true, force: true });
}

console.log(`
Done! Project created

cd ${projectName}
npm install
npm run dev

Start coding in the app/ folder!
`);