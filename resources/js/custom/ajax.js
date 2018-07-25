/*
 * @update : 2018.07.24
 * @author : 임용근
 * @description : Node.js 서버와 Ajax 통신하기 위한 모듈
*/
var host = "http://localhost:9999";
function send(restApi, params, method ){
	$.ajaxSetup({
		timeout		: 60000			,	
		cache 		: true			,
		async 		: true			,
		dataType	: "json"		,
		type		: method		,
		contentType : "application/json; charset=UTF-8",
		url			: host + restApi		 
	});	 
	return $.ajax({
		data : params ,
		success : function(jsonObj, status, xhr){
		},
		error	: function(xhr,status,error){
			console.log(error);
			console.error( error);
		}
	});
		
}

var Api = {
    getBlackList : function(params){
		return send( "/blacklist", params, "GET");
	}
}


