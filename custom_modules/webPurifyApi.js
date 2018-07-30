'use strict'
/*
 * @update : 2018.07.24
 * @author : 임용근
 * @description : WebPurify API를 이용하여 욕설등을 검열한다.
 */

const WebPurify = require('webpurify');
const wpConfig = require('../config/config.json').webpurify;

var wp = null;
var wpApi = {
    init: () => {
        if (wp == null) {
            wp = new WebPurify({
                api_key: wpConfig.api_key
            });
        }

    },
    return: (text) => {
        return wp.return(text);
    },
    blacklist: () => {
        return wp.getBlacklist();
    },
    addToBlacklist: (word) => {
        return wp.addToBlacklist(word, 1); //deep search 기능 on
    }
}
module.exports = wpApi;