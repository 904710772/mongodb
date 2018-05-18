const comConfig = require('../config');
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://127.0.0.1:27017/${comConfig.logDB}`;

module.exports = function(){
    return new Promise((resolve,reject)=>{
        MongoClient.connect(url,(err, db)=> {
            if(err){
                reject({
                    err:1,
                    code:'COMMON_CONNECT_FAILED'
                });
            }else{
                resolve(db);
            }
        });
    });
};