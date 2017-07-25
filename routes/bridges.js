/**
 * Created by Administrator on 2017/7/21.
 */

var express = require( 'express' ),
    router = express.Router(),
    url = require( 'url' ),
    bridges = require( '../modules/bridges_mongodb' );

router.get( '/', function ( req, res, next ) {
    "use strict";
    var get_params = url.parse( req.url, true ).query,
        key, value;
    if ( Object.keys( get_params ).length === 0 ) {
        bridges.list( res );
    }else {
        console.log( 'get_params', get_params, get_params[ 'page' ], get_params[ 'page' ] !== null );
        if ( get_params[ 'page' ] !== undefined   || get_params[ 'limit' ] !== undefined ) {
            console.log( 'bridges.paginate' );
            bridges.paginate( req, res );
        }else {
            console.log( 'bridges.query_by_arg' );
            key = [], value= [];
            Object.keys( get_params ).forEach( function ( para ) {
                key.push( para );
                value.push( get_params[ para ] );
            } );
            bridges.query_by_arg( key, value, res);
        }
    }
} );

router.get( '/:number', function ( req, res, next ) {
    "use strict";
    bridges.query( req.params.number, res );

} );

router.post( '/', function ( req, res, next ) {
    "use strict";
    bridges.update( req.body,  res);
} );

router.put( '/:name', function ( req, res, next ) {
    "use strict";
    bridges.update( req.body,  res);
} );

module.exports = router;
