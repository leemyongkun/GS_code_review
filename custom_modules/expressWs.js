//몽고DB API
var mongoApi = require('../custom_modules/mongoApi');
//WebPurify API 설정 초기화
var wpApi = require('../custom_modules/webPurifyApi');

var clients = [];
var ws = {
    init: (app) => {
        console.log("init Express-WebSocket");
        //webpurify 초기화
        wpApi.init();
        app.ws('/ws', (ws, req) => {
            //접속자를 저장해둔다.
            clients.push(ws);

            ws.on('message', message => {

                //webpurify 단어가 일치하는지 확인
                wpApi.return(message).then(matchWord => {

                    //현재 접속자들에게 메시지를 보낸다.
                    clients.forEach((client) => {

                        let msg = message;

                        //BlackList에 포함된 단어 빨간색으로 처리한다.
                        matchWord.forEach(word => {
                            // mongoApi.insert(word);
                            let regExp = new RegExp(word, "g");
                            msg = message.replace(regExp, "<font color='red'>" + word + "</font>")
                        });
                        //mongoApi.insert(message);
                        client.send("<span class='word'>" + msg + "</span>");
                    });

                    matchWord.forEach(word => {
                        mongoApi.insert(word);
                    });

                    return matchWord;

                });

            });

            ws.on('close', () => {
                clients = clients.filter(conn => {
                    if (conn === ws) {
                        return false
                    } else {
                        return true;
                    }
                });
            });
        });

    }
}

module.exports = ws;