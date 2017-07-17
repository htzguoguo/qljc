var express = require('express'),
    User = require( '../modules/user_mongodb' ),
    router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.list( req, res, next );
});

router.get('/:username', function(req, res, next) {
    User.query( req.params.username, res, next );
});

router.post('/', function(req, res, next) {
    User.update( req, res, next );
});

router.get( '/:id', function ( req, res, next ) {
  "use strict";
  res.send( {
    name : 'jake',
    age : req.params.id
  } );
} );




module.exports = router;
