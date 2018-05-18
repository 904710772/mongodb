const comConfig = require('../config'),
    mongodb = require('./mongodb'),
    app = require('../server');

// app.use(function(req, res, next) {
//     res.status(404).send('Sorry cant find that!');
// });

/**
 * 封装 http 请求后 mongodb 操作执行结果
 * @param res 为express路由后的返回数据
 * @param err mongodb 错误信息
 * @param result mongodb 返回数据
 * @param db mongodb 实例
 * @returns {Promise}
 */
function httpMongodbReq (res, err, result, db) {
    let data = {};
    if(err) {
        console.log(err);
        res.send(err);
    }else {
        data = {
            "code" : 0,
            message : "success"
        };
        res.json(data);
        db.close();
    }
}

app.post('/logSetting', function (req, res) {
    console.log(req.body);
    let parameter = {
        "parentShopId":240880,
        "shopId" : 240881,
        "username":"18627801101",
        "deviceId":"qweqweq", //每个终端自动生成一个UUID
        "appId":"n_touchPad",
        "appVersion":"5.145",
        "platfrom":"Android", //Android,iOS,Win,Web
    };

    let resultData = {};

    if (req.body.parentShopId && req.body.shopId && req.body.username && req.body.deviceId
    && req.body.appId && req.body.appVersion && req.body.platfrom) {
        resultData = {
            "code" : 0,
            message : "success",
            content : {
                level : comConfig.logLevel,
                syncTime : comConfig.logSyncTime
            }
        };
        res.json(resultData);
    }else {
        resultData = {
            "code" : 1,
            message : "参数缺失"
        };
        res.json(resultData);
    }
});

app.get('/getUserLogList', function (req, res) {
    mongodb().then(db => {
        db.collection("site"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            let data = {};
            if(err) {
                console.log(err);
                res.send(err);
            }else {
                data = {
                    "code" : 0,
                    content : result
                };
                res.json(data);
                db.close();
            }
        });
    })
});

app.post('/saveUserLogs', function (req, res) {
    let {parentShopId, shopId, username, deviceId, appId, appVersion, platfrom} = req.body,
        publicObj = {parentShopId, shopId, username, deviceId, appId, appVersion, platfrom},
        params = [];

    for (let value of req.body.logs) {
        let obj = {
            ...publicObj,
            ...value
        }
        params.push(obj);
    }
    mongodb().then(db => {
        db.collection("site").insertMany(params, function(err, result) {
            httpMongodbReq(res, err, result, db);
        });
    })
});

app.post('/delUserLogs', function (req, res) {
    mongodb().then(db => {
        db.collection("site").deleteMany({}, function(err, result) {
            httpMongodbReq(res, err, result, db);
            console.log(result.result.n + " 条文档被删除");
        });
    })
});


