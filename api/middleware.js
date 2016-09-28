var userProxy = require('../proxy/user');

exports.auth = function (req, res, next) {

    var accessToken = String(req.body.accesstoken || req.query.accesstoken || '');
    accessToken = accessToken.trim();

    if (!accessToken) {
        return res.send({success: false, error_msg: '无效的 accessToken'});
    }

    userProxy.queryUserById(accessToken, function (user) {
        if (!user) {
            res.status(401);
            return res.send({success: false, error_msg: '错误的 accessToken'});
        }
        if (user.is_block) {
            res.status(403);
            return res.send({success: false, error_msg: '您的账户被禁用'});
        }
        req.user = user;
        next();
    });
};
