'use strict'
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

app.set("port", 9999);

//웹소켓 설정
var wss = require('./custom_modules/expressWs');
//몽고DB API 설정 초기화
var mongoApi = require('./custom_modules/mongoApi');
//WebPurify API 설정 초기화
var wpApi = require('./custom_modules/webPurifyApi');

//resources Path 설정 초기화
app.use('/resources', express.static(path.join(__dirname,'/resources')));

//몽고DB 커넥션 초기화
mongoApi.init();

//webpurify 초기화
wpApi.init();

//webSocketServer 초기화
wss.init(app , wpApi, mongoApi);
 

//라우터 셋팅
//채팅화면 출력
app.get("/onChat",(req,res) => {
    res.sendFile(path.join(__dirname, '/static', 'client.html'));
});

//몽고DB로부터 등록된 BlackList Word 가져오기
app.get("/blacklist",(req, res) => {
    mongoApi.wordList().then( list =>{
        res.status(200).json(list);
    });
});

app.all('*', (req,res)=>{
    res.status(404).send('404 - 잘못된 접근페이지입니다.');
})
//app.use(express.Router);



app.listen(app.get('port'), () => { 
    console.log("Startup Node WebApplication for CodeReview ") 
});

/* 
var expressServer = http.createServer(app).listen(app.get("port"), () => {
   console.log("Startup Node WebApplication for CodeReview ")
}); */
