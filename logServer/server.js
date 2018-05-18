const comConfig = require('./config'),
    express = require('express'),
    bodyParser = require("body-parser"), //用以获取 post 提交数据用
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = app.listen(comConfig.logPort, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;

