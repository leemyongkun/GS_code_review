/*
 * @update : 2018.07.24
 * @author : 임용근
 * @description : Node.js + WebSocketServer 를 이용한 심플채팅 어플리케이션. (욕설필터링 추가)
 * @Addition Moudule
    -babel , babel-cli , babel-preset-env (@dependency webpurify)
    -webpurify
    -express
    -express-ws
    -path
    -mongdb
*/
//var http = require('http');
var path = require('path'),
    express = require('express'),
    app = express();
var expressWs = require('express-ws')(app);
var wss = require('./custom_modules/expressWs');

//몽고DB API 설정 초기화
var mongoApi = require('./custom_modules/mongoApi');
//WebPurify API 설정 초기화
var wpApi = require('./custom_modules/webPurifyApi');

app.set("port",9999);

//resources Path 설정 초기화
app.use('/resources', express.static(path.join(__dirname,'/resources')));


//몽고DB 커넥션 초기화
mongoApi.init();

//webpurify 초기화
wpApi.init();

//webSocketServer 초기화
wss.init(app , wpApi, mongoApi);
 

//라우터 셋팅
//app.use(express.Router);

//채팅화면
app.get("/onChat",(req,res) => {
    res.sendFile(path.join(__dirname, '/static', 'client.html'));
});


app.listen(app.get('port'), () => { 
    console.log("Startup Node WebApplication for CodeReview ") 
});

/* 
var expressServer = http.createServer(app).listen(app.get("port"), () => {
   console.log("Startup Node WebApplication for CodeReview ")
}); */
