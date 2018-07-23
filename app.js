'use strict'
var http = require('http'),
    express = require('express'),
    path = require('path'),
    __static = require('static');

var app = express();


//set ResourcesPath


app.get('/test/:id',function(req,res){
    console.log("###",req.param("id"));
});
//setting router
app.use(express.Router);


http.createServer(app).listen(9999,function(req,res){
    console.log("Connect!");
})