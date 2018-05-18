var express = require('express');
var bodyParser = require("body-parser"); //用以获取 post 提交数据用
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var MongoClient = require('mongodb').MongoClient;
var MongoObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");

    app.get('/getUserInfoList', function (req, res) {
        dbo.collection("site"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            console.log(result);

            const data = {
                'result' : 1,
                data : result
            }
            res.json(data);
            // db.close();
        });
    });

    app.post('/addUserInfo', function (req, res) {
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
        dbo.collection("site").insertMany(params, function(err, obj) {
            if (err) throw err;
            const data = {
                'result' : 0,
                data : obj.result
            }
            console.log(obj.result);
            res.json(data);
            // db.close();
        });
    });

    app.post('/delUserInfo', function (req, res) {
        dbo.collection("site").deleteMany({}, function(err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " 条文档被删除");
            res.json(obj);
            // db.close();
        });
    });

    app.post('/editUserInfo', function (req, res) {
        console.log(req.body);
        let _id = MongoObjectId(req.body._id);
        var whereStr = {_id : _id};  // 查询条件
        console.log('whereStr', whereStr);
        var updateStr = { $set: {name : req.body.name, like : req.body.like} };
        dbo.collection("site").updateOne(whereStr, updateStr, function(err, res) {
            if (err) throw err;
            console.log("文档更新成功");
            // db.close();
        });
        res.json({success : true});
    });
});

// app.get('/getUser/:id', function (req, res) {
//     var products = [
//         { name: 'apple juice', description: 'good', price: 12.12 },
//         { name: 'banana juice', description: 'just so sos', price: 4.50 }
//     ];
//     if (products.length <= req.params.id || req.params.id < 0) {
//         res.statusCode = 404;
//         return res.send('Error 404: No products found')
//     }
//
//     const data = {
//         'result' : 1,
//         data : products[req.params.id]
//     }
//     res.json(data);
//     res.json(data);
// });


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
