// expressをrequireする
const express = require("express");

// ポート番号を設定
const portNumber = 3000;

// appオブジェクトを作成する
const app = express();

// JSON返信
app.get("/", (req, res) => {
    // res.set({ 'Access-Control-Allow-Origin': '*' });
    // res.status(200).send({ id: 1, message: "メッセージ" });

    fetch('3.112.50.206')
    .then(response => response.json())
    .then(data => {
        res.set({ 'Access-Control-Allow-Origin': '*' });
        res.status(200).send(data);
    })
    .catch(error => console.error('Error:', error));
});

// リクエストを待ち受ける
app.listen(portNumber);

console.log(`PortNumber is ${portNumber}`);