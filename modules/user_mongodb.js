/**
 * Created by Administrator on 2017/6/20.
 */

var mongoose = require( 'mongoose' ),
    User = require( './schema/user' ),
    helper = require( './http_helper' );

module.exports.list = function ( req, res, next ) {
    User.find()
        .sort( { createdAt : 'descending' } )
        .exec( function ( err, users ) {
            if ( err ) {
                helper.InternalServerError( res );
            }else {
                helper.ResourceFound( res, users );
            }
        } );
};

function toExistUser( data, body ) {
    data.username = body.username;
    data.password = body.password;
    data.displayName = body.displayName;
    data.bio = body.bio;
    data.role = body.role;
}

function toNewUser( body ) {
    "use strict";
    return new User(
        {
            username : body.username,
            password : body.password,
            displayName : body.displayName,
            bio : body.bio,
            role : body.role
        });
}

module.exports.update = function ( req, res, next ) {
    var username = req.body.username,
        newuser;
    User.findOne( { username : username }, function ( err, user ) {
        if ( err ) {
            helper.InternalServerError( res, err, { username :  username } );
        }else {
            newuser = toNewUser( req.body );
            if ( user ) {
                toExistUser(user, newuser);
                user.save( function ( error ) {
                    if ( ! error ) {
                        user.save();
                    }
                    helper.ResourceUpdated(res, user );
                } );
            }else {
                newuser.save( function ( error ) {
                    if ( ! error ) {
                        newuser.save();
                    }
                } );
                helper.ResourceCreated( res, newuser );
            }
        }
    } );
};

module.exports.query = function ( username, res, next ) {
    User.findOne( { username : username  }, function ( err, user ) {
        if ( err ) {
            helper.InternalServerError( res, err, { username :  username } );
        }else {
            if ( ! user ) {
                helper.ResourceNotFound( res , { username : username });
            }else {
                helper.ResourceFound( res, user );
            }
        }
    }  );
};

/*User.find()
    .sort({ createdAt: "descending" })
    .exec(function(err, users) {
        if (err) { return next(err); }
        res.render("index", { users: users });
    });*/


