//require modules
var http = require('http');
var url = require('url');
var file = require('fs');
var path = require('path');

//mime types

var mimeTypes = {
	"html" : "text/html",
	"jpeg" : "image/jpeg",
	"jpg" : "image/jpeg",
	"png" : "image/png",
	"js" : "text/javascript",
	"css" : "text/css"
};

//create server
var server = http.createServer();

server.on('request', serveFiles);

server.listen(process.env.PORT || 3000,()=>{console.log("listening on http://127.0.0.1:7249 ");});

//serving files
function serveFiles(req,res) {
	var parsedUrl = url.parse(req.url);
	var pathName = parsedUrl.pathname;
	var fileName = path.join(process.cwd(),"public",pathName);
	var stats;
	console.log(fileName);
	try {
		stats = file.lstatSync(fileName); // lstat is system call to find statistics of a file using filename
	} catch(err) {
		res.writeHead(404,"file doesnot exist",{"Content-Type":"text/html"});
		res.end("<h1>file doesnot exist.");
		return;
	}

	//if file/directory
	if(stats.isFile()) {
		var mimeType = mimeTypes[path.extname(fileName).split('.').reverse()[0]];
		res.writeHead(200,{'Content-Type': mimeType});
		var readStream = file.createReadStream(fileName);
		readStream.pipe(res);
	} else if(stats.isDirectory()) {
		res.writeHead(302,{
			'Location': 'index.html'
		});
		res.end();
	}
}