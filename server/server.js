var http = require("http");
var fs = require("fs");
var path = require("path");

http.createServer(function (request, response) {
  console.log("request ", request.url);
  var filePath = "." + request.url;
  if (filePath == "./") {
    filePath = "webPage/todolist.html";
  }

  var extname = String(path.extname(filePath)).toLowerCase();
  var mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
  };

  var contentType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(filePath, function(error, content) {
    if (error) {
      if (error.code == "ENOENT") {
          response.writeHead(404, { "Content-Type": "text/html" });
          response.write("<h1>404</hi>");
          response.end(content, "utf-8");
      } else {
        response.writeHead(500);
        response.end(
          "Sorry, check with the site admin for error: " + error.code + " ..\n",
        );
      }
    }else {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content, "utf-8");
    }
  });

}).listen(80);
console.log('Server running at http://127.0.0.1:80/');