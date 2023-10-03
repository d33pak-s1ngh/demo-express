const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
global.title = "Global Variable Declaration";

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

function readStream (req, res) {

  const file = path.resolve(__dirname,"demo-video.mp4");

  fs.stat(file, function(err, stats) {
    if (err) {
      if (err.code === 'ENOENT') {
        // 404 Error if file not found
        return res.statusCode(404);
      }
      res.end(err);
    }
    var range = req.headers.range;
      if (!range) {
       // 416 Wrong range
       return res.statusCode(416);
      }
      console.log('range',range);
      var positions = range.replace(/bytes=/, "").split("-");
      console.log('positions',positions);
      var start = parseInt(positions[0], 10);
      var total = stats.size;
      var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      var chunksize = (end - start) + 1;
      console.log('chunk',chunksize, ' start',start, ' end', end);
      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      });
      const stream = fs.createReadStream(file, {
        start: start,
        end: end,
      });
      // const stream = fs.createReadStream('./temp.txt',{encoding: 'utf-8', highWaterMark: 9000 });
      stream.on("open", () => {
        console.log("stream opened");
        stream.pipe(res);
      });
      stream.on("close", (error) => {
        console.log("stream closed");
        res.end(error);
      });

  });
}
const server =  http.createServer(async(req, res) => {
    // console.log('request object',req);
    res.statusCode = 200;
    res.setHeader('content-type','text/html')
    console.log('request url', req.url);
    console.log('title',title);
    if(req.url === '/') {
        console.log('sync file read started');
        const htmlContent = fs.readFileSync('./index.html');
        // const textContent = fs.readFileSync('./temp.txt');
        // const result = await promise();
        // console.log('sync file read end',result);
        // res.end(`promise end  ${textContent}`);
        res.end(htmlContent.toString());
        // readStream(res);
    } 
    else if (req.url === '/about') {
        res.end('<h1>Code with Deepak<h1/>');
    }
    else if (req.url === '/video') {
      console.log('load video called');
      readStream(req, res);
    }
    //  else {
    //     res.statusCode = 404;
    //     res.end('<h1>404 Page does not exist<h1/>');
    //     // res.end('<h1>Code with Deepak<h1/>');
    // }
    
});

server.listen(port,() => {
    console.log('server is listening');
})