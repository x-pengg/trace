exports.isBlock = function () {
    return function (req, res, next) {
        if (req.path === '/signout')
            return next();

        if (req.session.user && req.session.user.is_block && req.method !== 'GET')
            return res.status(403).send('您已被管理员屏蔽了。有疑问请联系 i@ridog.me。');

        next();
    }
};

exports.needLogin = function (req, res, next) {
    if (!req.session.user)
       return res.redirect('signin');
    next();
};

exports.setUserSession = function (user, req) {
    req.session.user = user;
};

exports.authUser = function () {
    return function (req, res, next) {
        if (req.session.user)
            res.locals.user = req.session.user;
        next();
    }
}