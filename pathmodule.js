const path = require('path');

console.log('path', path.basename('index.js'));

console.log('filename', __filename);
console.log('dirname', __dirname);
console.log(path.extname(__filename));