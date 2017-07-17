/**
 * Created by Administrator on 2017/4/26.
 */


var express = require( 'express' ),
    router = express.Router();

router.get( '/', function ( req, res ) {
    "use strict";
    res.writeHead( 301, { 'Location' : '/api/v1/contacts' } );
    res.end( 'version 2 is moved to v1/cotacts' );
} );

module.exports = router;