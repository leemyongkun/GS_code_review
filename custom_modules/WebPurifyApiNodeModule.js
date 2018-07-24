/*
 * @update : 2018.07.24
 * @author : 임용근
 * @description : WebPurify API를 이용하여 욕설등을 검열한다.
*/

const WebPurify = require('webpurify');
var wp = null;
var wpApi = {
    init : () => {
        wp = new WebPurify({
            api_key: "730bb0ab1887bb21e9729f7fddd809ab"
        });
    },
    return : (text) => {
        return wp.return(text);
    },
    blacklist : () => {
        return wp.getBlacklist();
    },
    addToBlacklist : (word) =>{
        return wp.addToBlacklist(word, 1);//deep search 기능 on
    }
}



module.exports=wpApi;