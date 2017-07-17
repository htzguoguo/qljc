/**
 * Created by Administrator on 2017/6/26.
 */

var BasicAuth = require( 'basic-auth' ),
    Helper = require( './http_helper' ),
    User = require( './schema/user' ),
    AuthorizationRequired;

AuthorizationRequired = module.exports.authorize = function ( req, res, next ) {
    var credentials = BasicAuth( req ) || {};
    User.findOne( { username : credentials.name }, function ( err, user ) {
        if ( err ) {
          return  Helper.NotAuthorized( req, res );
        }else {
            if ( user ) {
                user.checkPassword( credentials.pass, function ( err, isMatch ) {
                    if ( isMatch ) {
                        return next();
                    }else {
                        return  Helper.NotAuthorized( req, res );
                    }
                } );
            }else {
                return  Helper.NotAuthorized( req, res );
            }
        }
    }  );
};
