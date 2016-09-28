var router = require('express').Router();
var photoAPI = require('./api/photo');
var signAPI = require('./api/sign');
var middleware = require('./api/middleware');

router.get('/photos/:start/:size', photoAPI.getPhotos);
router.get('/photo/:photoId', photoAPI.getPhotoDetail);
router.post('/signin', signAPI.signin);

module.exports = router;