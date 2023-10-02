const fs = require('fs');

// fs.readFile('temp.txt','utf-8',(err,data) => {
//     console.log(err, data);
// })

// console.log(module);

const temp = fs.readFileSync('./temp.txt','utf-8');

console.log('temp data', temp);