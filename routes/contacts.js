/**
 * Created by Administrator on 2017/4/11.
 */

var express = require( 'express' ),
    router = express.Router(),
    multer = require( 'multer' ),
    url = require( 'url' ),
    contacts = require( '../modules/contacts_mongodb' ),
    upload;

function internalServerError ( res ) {
    "use strict";
    res.writeHead( 500, { 'Content-Type' : 'text/plain' } );
    res.end( 'Internal server error' );
}

router.get( '/', function ( req, res, next ) {
    "use strict";
    var get_params = url.parse( req.url, true ).query,
        key, value;
    if ( Object.keys( get_params ).length === 0 ) {
        contacts.list( res );
    }else {
        if ( get_params[ 'page' !== null ] || get_params[ 'limit' ] !== null ) {
            contacts.paginate( req, res );
        }else {
            key = [], value= [];
            Object.keys( get_params ).forEach( function ( para ) {
                key.push( para );
                value.push( get_params[ para ] );
            } );
            contacts.query_by_arg( key, value, res);
        }
    }
} );

router.get( '/:number', function ( req, res, next ) {
    "use strict";
    contacts.query( req.params.number, res );

} );

router.post( '/', function ( req, res, next ) {
    "use strict";
    contacts.update( req.body,  res);
} );

router.patch( '/', function ( req, res, next ) {
    "use strict";
    contacts.update(  req.body,  res );
} );

router.put( '/:number', function ( req, res, next ) {
    "use strict";
    contacts.update( req.body,  res);
} );

router.delete( '/:number', function ( req, res, next ) {
    "use strict";
    contacts.remove( req.params.number, res);
} );

router.get('/:number/:filename/portrait', function(req, res, next){

    contacts.getPortrait( req, res, next );
});

/*router.get( '/:arg/:value', function (  req, res, next) {
    "use strict";
    contacts.query_by_arg( req.params.arg, req.params.value, res);
} );*/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/avatar')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
/*upload = multer({ dest: './uploads/' });*/
upload = multer();
router.post( '/:number/avatar', upload.array( 'avatar',12), function ( req, res, next ) {

    contacts.uploadAvatar( req, res, next );
} );

router.delete( '/:number/:filename/portrait', function ( req, res, next ) {
    "use strict";
    contacts.deletePortrait( req, res, next);
} );

router.post( '/:number/portrait', upload.array( 'portrait',12), function ( req, res, next ) {

    contacts.uploadPortrait( req, res, next );
} );


module.exports = router;