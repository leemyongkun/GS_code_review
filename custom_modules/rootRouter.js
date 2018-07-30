var path = require('path')
    //몽고DB API
var mongoApi = require('../custom_modules/mongoApi');

module.exports = function(express) { //함수로 만들어 객체 app을 전달받음

    var rootRouter = express.Router();

    //채팅화면 출력
    rootRouter.get("/onChat", (req, res) => {
        res.sendFile('client.html', { root: path.join(__dirname, '../static') });
    });

    //몽고DB로부터 등록된 BlackList Word 가져오기
    rootRouter.get("/blacklist", (req, res) => {
        mongoApi.wordList().then(list => {
            res.status(200).json(list);
        });
    });

    rootRouter.all('*', (req, res) => {
        res.status(404).send('404 - 잘못된 접근페이지입니다.');
    });

    return rootRouter; //라우터를 리턴
};