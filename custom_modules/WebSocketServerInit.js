/*
 * @update : 2018.07.24
 * @author : 임용근
 * @description : WebSocket 관련 설정 및 message 처리를 한다.
*/
var WebSocketServer = require('websocket').server;
var ws = {
    init : function(expressServer){
        console.log("init websocket");
    }
}
module.exports = ws;