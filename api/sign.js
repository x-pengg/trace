var user = require('../proxy/user');
var validator = require('validator');
var eventproxy = require('eventproxy');
var utility = require('utility');


exports.signin = function (req, res, next) {

    var email = req.body.email||'',
        pass = req.body.pass||'';

    var ep = new eventproxy();
    ep.fail(next);

    ep.on('invalid_param', function (msg) {
        res.status(422);
        res.send({success: false, error_msg: msg});
    });

    if (validator.isNull(email))
        return ep.emit('invalid_param','邮箱不能为空');

    if (!validator.isEmail(email))
        return ep.emit('invalid_param','邮箱格式错误');

    if (validator.isNull(pass))
        return ep.emit('invalid_param','密码不能为空');

    user.queryUserByEmail(email, function (err, user) {
        if (err)
            next(err);

        if (!user)
            return ep.emit('invalid_param','用户名不存在');

        if (!validator.equals(utility.md5(pass.toLowerCase()), user.pass))
            return ep.emit('invalid_param','密码错误');

        res.send({success: true, accessToken: user._id});

    });
};