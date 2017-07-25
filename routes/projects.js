/**
 * Created by Administrator on 2017/7/19.
 */

var express = require( 'express' ),
    router = express.Router(),
    url = require( 'url' ),
    projects = require( '../modules/project_mongodb' );

router.get( '/', function ( req, res, next ) {
    "use strict";
    var get_params = url.parse( req.url, true ).query,
        key, value;
    if ( Object.keys( get_params ).length === 0 ) {
        projects.list( res );
    }else {
        if ( get_params[ 'page' ] !== null  || get_params[ 'limit' ] !== null ) {
            projects.paginate( req, res );
        }else {
            key = [], value= [];
            Object.keys( get_params ).forEach( function ( para ) {
                key.push( para );
                value.push( get_params[ para ] );
            } );
            projects.query_by_arg( key, value, res);
        }
    }
} );

router.get( '/:name', function ( req, res, next ) {
    "use strict";
    projects.query( req.params.name, res );

} );

router.post( '/', function ( req, res, next ) {
    "use strict";
    projects.update( req.body,  res);
} );

router.put( '/:name', function ( req, res, next ) {
    "use strict";
    projects.update( req.body,  res);
} );

router.delete( '/:name', function ( req, res, next ) {
    "use strict";
    projects.remove( req.params.name, res);
} );






module.exports = router;