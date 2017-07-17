/**
 * Created by Administrator on 2017/6/21.
 */

var Passport = require( 'passport' );

module.exports.login = function ( req, res, next ) {
    Passport.authenticate( 'login', {
        successRedirect: 'loginSuccess',
        failureRedirect: 'loginFailure'
    } );
};

module.exports.logout = function ( req, res, next ) {
    req.logout();
};

function loginSuccess (req, res){
    res.json({
        success: true,
        user: req.session.passport.user
    });
}

// on Login Failure callback
function loginFailure (req, res){
    res.json({
        success:false,
        message: 'Invalid username or password.'
    });
}

module.exports.authorize = function ( req, res, next ) {
    if ( req.isAuthenticated() ) {
        next();
    }else {
        result = {
            "error": {
                "code": "bf-401",
                "message": "Not Authorized",
                "context": {
                    "url": req.url
                }
            }
        };
        res.status(401).send( result );
    }
};
