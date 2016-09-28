var photo = require('../proxy/photo');

exports.getPhotos = function (req, res, next) {
    var start = req.params.start;
    var size = Number(req.params.size);
    photo.findPhotos(start, size, function (err, photos) {
        start = Number(start||1);
        size = Number(size||20);
        if (err){
            return next(err);
        }
        photo.findAll(function (err, _photos) {
            if (err){
                return next(err);
            }
            var page = {
                data: photos,
                pagination: {
                    pages: Math.ceil(_photos.length / size),
                    total : _photos.length,


                    current : start,
                    next : start+1 >= Math.ceil(_photos.length / size) ? Math.ceil(_photos.length / size) : start+1,
                    prev: Math.abs(start-1) <= 0 ? 1 : Math.abs(start-1)
                }
            };
            res.send(page);
        });

    });
};

exports.getPhotoDetail = function (req, res, next) {
    var photoId = req.params.photoId;
    photo.findById(photoId, function (err, photo) {
        if (err){
            return next(err);
        }
        res.send(photo);
    });
};