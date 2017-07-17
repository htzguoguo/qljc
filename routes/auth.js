/**
 * Created by Administrator on 2017/4/17.
 */

var express = require( 'express' ),
    Passport = require( 'passport' ),
    router = express.Router(),
    admin = require( '../modules/user' ),
    oauth = require( '../modules/oauth2-middleware' );

/*router.post( '/', Passport.authenticate( 'login' ) );*/

router.post( '/', oauth.authenticate );

router.delete( '/', oauth.logout );

module.exports  = router;
