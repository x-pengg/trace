var user = require('../proxy/user');
var validator = require('validator');
var eventproxy = require('eventproxy');
var utility = require('utility');
var setUserSession = require('../middlewares/auth').setUserSession;

exports.signinView = function (req, res, next) {
    res.render('signin');
};

exports.signin = function (req, res, next) {

    var email = req.body.email,
        pass = req.body.pass;

    var ep = new eventproxy();
    ep.fail(next);

    ep.on('invalid_param', function (msg) {
        res.status(422);
        res.render('signin', { error: msg });
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

        setUserSession(user, req);

        res.redirect('/');
    });
};

exports.signupView = function (req, res, next) {
    res.render('signup');
};

exports.signup = function (req, res, next) {

    var name = req.body.name;
    var pass = req.body.pass;
    var email = req.body.email;
    var url = req.body.url;
    var location = req.body.location;

    var ep = new eventproxy();
    ep.fail(next);

    ep.on('invalid_param', function (msg) {
        res.status(422);
        res.render('signup', {error: msg, email: email});
    });

    if (validator.isNull(name))
        return ep.emit('invalid_param','昵称不能为空');

    if (validator.isNull(email))
        return ep.emit('invalid_param','邮箱不能为空');

    if (!validator.isEmail(email))
        return ep.emit('invalid_param','邮箱格式错误');

    if (validator.isNull(pass))
        return ep.emit('invalid_param','密码不能为空');

    if (!validator.isLength(pass, {min: 6, max: 16}))
        return ep.emit('invalid_param','密码长度不够或太长 {min: 6, max: 16}');

    user.queryUserByEmail(email,function (err, user) {
        if (err)
            next(err);

        if (user)
            return ep.emit('invalid_param','邮箱已存在');
    });


    user.addUser(name, pass, email, url, location,function (err) {
        if (err){
            return next(err);
        }
        // 注册成功
        return res.send('注册成功! '+name);
    });
};

exports.signout = function (req, res, next) {
    req.session.destroy();
    res.redirect('/');
};
