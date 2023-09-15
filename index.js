const fs = require('fs');

const textIn = fs.readFileSync('test.txt', 'utf-8');

console.log(textIn);

const textOut = `This is a test text: ${textIn}. \n Created on ${Date.now()}`;
fs.writeFileSync('output.txt', textOut);
console.log('File written.')