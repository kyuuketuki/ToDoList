// インポート
var  express = require("express");

// ポート番号を設定
const portNumber = 3000;

// appオブジェクトを作成する
var app = express();

const cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://13.231.30.42:80");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
    next();
};

app.use(cors);
app.use(express.json());

// リクエスト待機
app.listen(portNumber);

console.log(`PortNumber is ${portNumber}`);

// ----------------------------------------
// リクエスト
// ----------------------------------------
//getリクエスト
app.get("/", (req, res) => {
    console.log("GETリクエストが来た");
    fetch("http://3.112.50.206")
    .then(response => response.json())
    .then(data => {
        res.status(200).send(data);
    })
    .catch(error => console.error("Error:", error));
});

// postリクエスト
app.post("/", (req, res) => {
    console.log("POSTリクエストが来た");
    fetch("http://3.112.50.206", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(req.body)
    })
    .catch(error => console.error("Error:", error));
});