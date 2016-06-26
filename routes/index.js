var express = require('express');
var router = express.Router();

var users = require('./users');
var login = require('./login');
var uploadImage = require('./uploadImage');
var formAnswer = require('./formAnswer');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.use('/', function (req, res, next) {
//   res.set('Access-Control-Allow-Origin', '*');
//   res.set('Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   //res.render('index', { title: 'Express' });
//   next();
// });

router.use('/users', users);
router.use('/login', login);
router.use('/upload/image', uploadImage);
router.use('/formAnswer', formAnswer);


module.exports = router;
