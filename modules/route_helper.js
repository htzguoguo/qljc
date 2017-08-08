/**
 * Created by Administrator on 2017/8/7.
 */



var express = require( 'express' ),
    router = express.Router(),
    url = require( 'url' );

module.exports = function ( task ) {
    router.get( '/', function ( req, res, next ) {
        "use strict";
        var get_params = url.parse( req.url, true ).query,
            key, value;
        if ( Object.keys( get_params ).length === 0 ) {
            task.list( res );
        }else {
            if ( get_params[ 'page' ] !== undefined   || get_params[ 'limit' ] !== undefined ) {
                task.paginate( req, res );
            }else {
                key = [], value= [];
                Object.keys( get_params ).forEach( function ( para ) {
                    key.push( para );
                    value.push( get_params[ para ] );
                } );
                task.query_by_arg( key, value, res);
            }
        }
    } );

    router.get( '/:number', function ( req, res, next ) {
        "use strict";
        task.query( req.params.number, res );

    } );

    router.post( '/', function ( req, res, next ) {
        "use strict";
        task.update( req.body,  res);
    } );

    router.put( '/:name', function ( req, res, next ) {
        "use strict";
        task.update( req.body,  res);
    } );

    router.delete( '/:name', function ( req, res, next ) {
        "use strict";
        task.remove( req.params.name, res);
    } );
    return router;
};

