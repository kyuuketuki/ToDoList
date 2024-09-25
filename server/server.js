// モジュールの読み込み
var http = require('http');
const html = require('fs').readFileSync("../webPage/todolist.html");

// httpサーバの作成
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(html)
  res.end();
}).listen(3000); // ポート3000番でコネクションの受け入れを行う