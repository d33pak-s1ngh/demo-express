const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 3000;


const promise = () => {
    console.log('new promise stared');
  return new Promise((resolve, reject) => {
    const interval = setTimeout(() => {
      console.log("timeout ends");
      resolve("promise end");
    }, 20000);
    // console.log("set timeout started", interval);
  });
};

const server =  http.createServer(async(req, res) => {
    // console.log('request object',req);
    res.statusCode = 200;
    res.setHeader('content-type','text/html')
    console.log('request url', req.url);
    // if(req.url === '/') {
        console.log('sync file read started');
        // const htmlContent = fs.readFileSync('./index.html');
        // const textContent = fs.readFileSync('./temp.txt');
        const result = await promise();
        console.log('sync file read end',result);
        res.end(`promise end  ${req.url}`);
        // res.end(textContent.toString());
    // } 
    // else if (req.url === '/about') {
    //     res.end('<h1>Code with Deepak<h1/>');
    // } else {
    //     res.statusCode = 404;
    //     res.end('<h1>404 Page does not exist<h1/>');
    //     // res.end('<h1>Code with Deepak<h1/>');
    // }
    
});

server.listen(port,() => {
    console.log('server is listening');
})