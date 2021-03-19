const e = require('express');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path'); //系统路径模块

/* GET api. */
router.get('/', function (req, res, next) {
    res.send("请求正常");
});

router.get('/banner', function (req, res, next) {
    var file = path.join(__dirname, '../public/data/banner.json'); //文件路径，__dirname为当前运行js文件的目录
    console.log(file)
    //读取json文件
    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) {
            res.send('请求失败');
        } else {
            res.send(data);
        }
    });
});
router.get('/recommended', function (req, res, next) {
    var file = path.join(__dirname, '../public/data/recommended.json'); //文件路径，__dirname为当前运行js文件的目录
    console.log(file)
    //读取json文件
    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) {
            res.send({
                code: 500,
                msg: '请求失败'
            });
        } else {
            res.send(data);
        }
    });
});

router.get('/applist', function (req, res, next) {
    var file = path.join(__dirname, '../public/data/applist.json'); //文件路径，__dirname为当前运行js文件的目录
    console.log(file)
    //读取json文件
    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) {
            res.send('请求失败');
        } else {
            res.send(data);
        }
    });
});

router.get('/recommended', function (req, res, next) {
    var file = path.join(__dirname, '../public/data/recommended.json'); //文件路径，__dirname为当前运行js文件的目录
    console.log(file)
    //读取json文件
    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) {
            res.send('请求失败');
        } else {
            res.send(data);
        }
    });
});

// TODO 查询配置文件或者数据库信息来确认是否有更新  
function checkUpdate(params, callback) {
    let result = {
        appVersion: "1.0.0",
        wgtUrl: "https://server.nooapp.com/file/__UNI__8F97DDA.wgt",
        pkgUrl: "https://server.nooapp.com/file/"
    }
    console.log(params)
    // 这里简单判定下，不相等就是有更新。
    var currentVersions = params.appVersion.split('.');
    var resultVersions = result.appVersion.split('.');

    if (currentVersions[0] < resultVersions[0]) {
        // 说明有大版本更新  
        callback({
            update: true,
            wgtUrl: '',
            pkgUrl: result.pkgUrl
        })
    } else if (params.appVersion < result.appVersion) {
        // 其它情况均认为是小版本更新  
        callback({
            update: true,
            wgtUrl: result.wgtUrl,
            pkgUrl: ''
        })
    } else {
        // 无需更新
        callback({
            update: false,
            wgtUrl: '',
            pkgUrl: ''
        })
    }
}

/**
 * 
 */
router.get('/app_update', function (req, res) {
    var appName = req.query.name;
    var appVersion = req.query.version;
    checkUpdate({
        appName: appName,
        appVersion: appVersion
    }, function (result) {
        res.send(result);
    });
})

module.exports = router;
