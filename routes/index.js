var express = require('express'),
path = require( 'path' );
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 /* res.render('index', { title: 'Express' });*/
  res.sendfile( path.join(__dirname, '../public', 'login.html') ) ;
  //res.redirect( 'login.html' );
});

module.exports = router;
