// // モジュールの読み込み
// var http = require("http");
// const html = require("fs").readFileSync("../webPage/todolist.html");

// // httpサーバの作成
// http.createServer(function (req, res) {
//   res.writeHead(200, {"Content-Type": "text/html"});
//   res.write(html);
//   res.end();
// }).listen(3000); // ポート3000番でコネクションの受け入れを行う

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

}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');