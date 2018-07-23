/*
 * @update : 2018.07.24
 * @author : 임용근
 * @description : MongoDB CRUD API를 작성한다.
*/
//몽고DB 모듈 사용
var mongoClient = require('mongodb').MongoClient;
var serverName = 'node_ws',
    dbConnUrl = 'mongodb://localhost:27017/'+ serverName;

var mongo = {
    database : null,
    init : () => {
        //MongoDB 연결 구문
        /*mongoClient.connect(dbConnUrl, (err, client) => {
            this.database = client.db(serverName);
        });*/
    },
    insert : ()=>{
        console.log("insert");
    }
}

module.exports = mongo;