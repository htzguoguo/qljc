/**
 * Created by Administrator on 2017/4/11.
 */

var express = require( 'express' ),
    router = express.Router(),
    products = require( '../modules/products' );

router.get( '/', function ( req, res, next ) {
    "use strict";
    res.setHeader( 'Content-Type', 'application/json' );
    res.send( products.list() );
} );

router.head( '/:id', function ( req, res, next )  {
    "use strict";
    var product = products.get_by_id( req.params.id);
    if ( product ) {
        res.status(200);
    }else {
        res.status( 404 );
    }
    res.send( 'head' ).end();
} );

router.get( '/:id', function ( req, res, next ) {
    "use strict";
    res.setHeader( 'Content-Type', 'application/json' );
    res.send( products.get_by_id( req.params.id ) );
} );

router.get( '/:id/parts', function ( req, res, next ) {
    "use strict";
    res.setHeader( 'Content-Type', 'application/json' );
    res.send( products.get_parts( req.params.id ) );
} );

router.post( '/:id/parts', function ( req, res, next ) {
    "use strict";
    res.setHeader( 'Content-Type', 'application/json' );
    products.insert_parts( req.params.id, req.body );
    res.send( products.get_parts( req.params.id ) );
} );

router.delete( '/:id', function ( req, res, next ) {
    "use strict";
    res.setHeader( 'Content-Type', 'text/plain' );
    products.delete_product( req.params.id );
    res.send( 'ok' );
} );

router.put( '/', function ( req, res, next ) {
    "use strict";
    res.setHeader( 'Content-Type', 'text/plain' );
    products.create_product( req.body );
    res.send( 'ok' );
} );

router.patch( '/:id', function ( req, res, next ) {
    "use strict";
    res.setHeader( 'Content-Type', 'text/plain' );
    products.update_product( req.params.id, req.body );
    res.send( 'ok' );
} );

module.exports = router;
