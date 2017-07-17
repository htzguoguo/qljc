/**
 * Created by Administrator on 2017/4/11.
 */

var express = require( 'express' ),
    router = express.Router(),
    cors = require( 'cors' ),
    contracts = require( '../modules/contacts_file' );

router.get( '/', cors(), function ( req, res, next ) {
    "use strict";
    res.format( {
        'text/xml' : function () {
            res.send( contracts.list_groups()  );
        },
        'application/json' : function () {
            res.send( JSON.stringify( contracts.list_groups() ) );
        },
        'default' : function () {
            res.status( 406 ).send( 'Not Acceptable' );
        }
    } );
} );

router.get( '/:name', function ( req, res, next ) {
    "use strict";
    res.setHeader(
        'Content-Type' , 'application/json'
    );
    res.end( JSON.stringify(contracts.get_members( req.params.name )) );
} );

module.exports = router;