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
//몽고DB API
var mongoApi = require('./custom_modules/mongoApi');

//웹소켓 설정
require('./custom_modules/expressWs')(app);

app.set("port", 9999);

//resources Path 설정 초기화
app.use('/resources', express.static(path.join(__dirname, '/resources')));

//라우터 셋팅
app.use('/', require('./router/root')(express));

/*
1. connection pool 생성
2. DB로 인한 Server runtime에러를 방지 하기 위해 Startup 하기 전, Connection을 우선 생성한다.
*/
mongoApi.getConnection().then(() => {

    app.listen(app.get('port'), () => {
        console.log("Startup Node WebApplication for CodeReview ")
    });
});