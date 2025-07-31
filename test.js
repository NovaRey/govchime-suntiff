console.log('Testing basic Node.js functionality');
const fs = require('fs');
console.log('Current directory:', process.cwd());
console.log('Files in directory:', fs.readdirSync('.').slice(0, 10));
