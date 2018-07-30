'use strict'
/*
 * @create : 2018.07.24
 * @update : 2018.07.30
 * @author : 임용근
 * @description : 
 * 1. Node.js + WebSocketServer 를 이용한 심플채팅 어플리케이션. (욕설필터링 추가)
 * 2. server를 기동하기 전에 mongoDB Connection Pool 초기화를 우선한다.
 * 
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
//웹소켓 설정
var wss = require('./custom_modules/expressWs');
//몽고DB API
var mongoApi = require('./custom_modules/mongoApi');

app.set("port", 9999);
//resources Path 설정 초기화
app.use('/resources', express.static(path.join(__dirname, '/resources')));
//webSocketServer 초기화
wss.init(app);

//라우터 셋팅
//채팅화면 출력
app.get("/onChat", (req, res) => {
    res.sendFile(path.join(__dirname, '/static', 'client.html'));
});


//몽고DB로부터 등록된 BlackList Word 가져오기
app.get("/blacklist", (req, res) => {
    mongoApi.wordList().then(list => {
        res.status(200).json(list);
    });
});

app.all('*', (req, res) => {
    res.status(404).send('404 - 잘못된 접근페이지입니다.');
});

/*
1. connection pool 생성
2. DB로 인한 Server runtime에러를 방지 하기 위해 Startup 하기 전, Connection을 우선 생성한다.
*/
mongoApi.getConnection().then(() => {
    app.listen(app.get('port'), () => {
        console.log("Startup Node WebApplication for CodeReview ")
    });
});