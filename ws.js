/*
 * @update : 2018.07.24
 * @author : 임용근
 * @description : Node.js + WebSocketServer 를 이용한 심플채팅 어플리케이션. (욕설필터링 추가)
 * @Addition Moudule
    -express
    -websocket
    -express-ws
    -path
    -mongdb
*/
var http = require('http'),
    path = require('path'),
    express = require('express');
var app = express();
var ws = require('./custom_modules/WebSocketServerInit');
var mongoApi = require('./custom_modules/mongoApi').init();

app.set("port",9999);

//set resources
app.use('/resources', express.static(path.join(__dirname,'/resources')));

//set router
app.get("/client",(req,res) => {
    res.sendFile(path.join(__dirname, '/static', 'client.html'));
});

//라우터 셋팅
//app.use(express.Router);

var expressServer = http.createServer(app).listen(app.get("port"), () => {
   console.log("Startup Node WebApplication for CodeReview ")
});
 

ws.init(expressServer);

