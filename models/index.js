var mongoose = require('mongoose');
var config = require('../config');

// 打印 mongoose 日志
mongoose.set('debug', config.debug);

if (config.debug) {
    config.db = config.local_db;
}

// 连接 mongodb
mongoose.connect(config.db, {
    server: {poolSize: 20}
}, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

// models
require('./user');
require('./photo');


exports.User = mongoose.model('User');
exports.Photo = mongoose.model('Photo');