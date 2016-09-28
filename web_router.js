var router = require('express').Router();
var home = require('./controllers/home');
var sign = require('./controllers/sign');
var photo = require('./controllers/photo');
var photoAPI = require('./api/photo');
var needLogin = require('./middlewares/auth').needLogin;

// home page
router.get('/', home.index);

// signin
router.get('/signin', sign.signinView);
router.post('/signin', sign.signin);

// signup
router.get('/signup',  sign.signupView);
router.post('/signup', sign.signup);

// sign out
router.get('/signout',  sign.signout);

// upload
router.get('/getUpToken', needLogin, photo.getUpToken);
router.get('/upload', needLogin, photo.upload);
router.post('/savePhoto', needLogin, photo.savePhoto);
router.get('/getMyPhotos', needLogin, photo.getMyPhotos);

module.exports = router;