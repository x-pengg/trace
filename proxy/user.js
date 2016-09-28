var User = require('../models/index').User;
var utility = require('utility');
var mongoose = require('mongoose');

/**
 *  插入新用户
 * @param name 用户名
 * @param pass 密码
 * @param email 邮箱
 * @param url 个人主页
 * @param location 所在位置
 * @param callback 回调函数
 */
exports.addUser = function (name, pass, email, url, location, callback) {

    var user = new User({
        name: name,
        pass: utility.md5(pass.toLowerCase()),
        email: email,
        url: url,
        location: location
    });

    user.save(callback);
};

/**
 *  查询用户
 * @param email 邮箱
 * @param callback
 * @returns {*}
 */
exports.queryUserByEmail = function (email, callback) {

    if (!email) {
        return callback(null, []);
    }

    User.findOne({email: email}, callback)

};

/**
 *  查询用户
 * @param id
 * @param cb
 */
exports.queryUserById = function (id, cb) {
    User.findOne({_id: mongoose.Types.ObjectId(id)}, cb);
};