var qiniu = require("qiniu");
var config = require("../config");
var photo = require('../proxy/photo');

qiniu.conf.ACCESS_KEY = config.qiniu.access_key;
qiniu.conf.SECRET_KEY = config.qiniu.secret_key;
var uptoken = new qiniu.rs.PutPolicy('resource');


exports.upload = function (req, res, next) {
    res.render('upload',{ domain: config.qiniu.domain });
};


exports.getUpToken = function (req, res, next) {
    var token = uptoken.token();
    res.header("Cache-Control", "max-age=0, private, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    if (token) {
        res.json({
            uptoken: token
        });
    }
};

exports.savePhoto = function (req, res, next) {
    var userId = req.session.user._id;
    var photoUrl = req.body.photoUrl;
    var lat = req.body.lat;
    var lon = req.body.lon;
    var camera = req.body.camera;
    photo.createPhoto(photoUrl, lat, lon, camera, userId, function (err) {
        if (err){
            return next(err);
        }
        return res.send('success! ');
    });
};

exports.getMyPhotos = function (req, res, next) {
    var userId = req.session.user._id;
    photo.findPhotoByUser(userId, function (err, photos) {
        if (err){
            return next(err);
        }
        res.render('photos', {photos:photos})
    })
};



