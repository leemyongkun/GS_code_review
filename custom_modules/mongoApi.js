'use strict'
/*
 * @update : 2018.07.24
 * @author : 임용근
 * @description : MongoDB CRUD API를 작성한다.
*/
//몽고DB 모듈 사용
//Test PATH : mongod --dbpath "c:\Users\ykleem\Documents\mongod\gscodereview"

var mgClient = require('mongodb').MongoClient;
var dbName = 'gscodereview',
    collectionName = 'words',
    dbConnUrl = 'mongodb://localhost:27017/'+ dbName;
var collection;

var mongo = {
    init : () => {
        //MongoDB 연결 구문
        mgClient.connect(dbConnUrl, { useNewUrlParser: true }, (error, client) => {
            if(error){
                console.log('ERROR : ' , error.message);
                throw error;
            }
            //콜렉션
            collection = client.db(dbName).collection(collectionName);

            console.log('Connected MongoDB (DB : '+dbName+')');
            console.log('Use Collection (collection : '+collectionName+')');
            
        });
    },
    insert : (word)=>{
        
        var param ={
            name : word
        }
        //추가하려는 단어가 있는지 조회
        collection.find(param).toArray( (error, result)=>{
            if(error){
                console.log('ERROR : ', error.message);
                throw error
            }
            //없으면 추가
            if(result.length == 0){
                collection.insert(param).then( () => {
                    console.log(word + " 추가.");
                });;
            }else{
                console.log('이미 포함된 단어.');
            }
        })
    },
    wordList : ()=>{
        //DB에서 모든 데이타 가져오기.
        return new Promise( (res,rej) =>{
            collection.find().toArray( (error, result) =>{
                if(error){
                    rej(error);
                }else{
                    res(result);
                }
            });

        });
    }
}

module.exports = mongo;