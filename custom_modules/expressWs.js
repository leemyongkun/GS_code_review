var clients = [];
var ws = {
    init : (app , wpApi) => {
        console.log("init Express-WebSocket");

        app.ws('/ws', (ws, req) => {
            //접속자를 저장해둔다.
            clients.push(ws);
          
            ws.on('message', message => {
               
                 //webpurify 단어가 일치하는지 확인
                 wpApi.return(message).then( retval => {
                    clients.forEach(socket => {
                        retval.forEach( word => {
                            let regExp = new RegExp(word , "g");
                            message = message.replace(regExp,"<font color='red'>"+word+"</font>")
                        });
                        socket.send(message);
                        
                    });
                })
            });
            
            ws.on('close', () => {
                clients = clients.filter(conn => {
                    if(conn === ws){
                        return false
                     }else{
                        return true;
                     } 
                });
            });
        });

    }
}

module.exports = ws;