var photo = require('../proxy/photo');

exports.index = function (req, res, next) {
    photo.findAll(function (err, photos) {
        if (err){
            return next(err);
        }
        res.render('index',{title: 'trace', photos: photos});
    });
};