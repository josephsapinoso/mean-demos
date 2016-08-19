var http = require("http"); // http is a node module. "require is the method that specifies the http node module"

http.createServer(function (request, response) { 

	response.writeHead(200, {'Content-Type': 'text/plain'}); // 'Content-Type': 'text/plain' is the type of content the server will send as a response

	response.end('Hello World'); // the actual response sent my the server

}).listen(8081);



