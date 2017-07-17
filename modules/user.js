/**
 * Created by Administrator on 2017/4/17.
 */

var helper = require( './http_helper' ),
    User = require( './schema/user' );

module.exports.authorize = function ( req, res, next ) {
    "use strict";
    var result;
    if ( req.session.login ) {
        next()
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

module.exports.login = function ( req, res, next ) {
    var result;
    var user = req.body;
    var username = user.name,
        password = user.pw;
    User.findOne({ username: username }, function(err, user) {
        if (err) {
            helper.InternalServerError( res, err, { username :  username } );
        }else {
            if (!user) {
                helper.ResourceNotFound( res , { username : username } , "用户名不存在");
            }else {
                user.checkPassword(password, function(err, isMatch) {
                    if (err) {
                        helper.InternalServerError( res, err, { username :  username } );
                    }else {
                        if (isMatch) {
                            req.session.login = user;
                            helper.ResourceFound( res,  {
                                status : 'online',
                                desc : '0'
                            });
                        } else {
                            helper.ResourceNotFound( res , { username : username } , "密码错误");
                        }
                    }
                });
            }

        }

    });
};

module.exports.logout = function ( req, res, next ) {
    "use strict";
    if ( req.session.login ) {
        req.session.destroy();
    }

    res.status(200).send( {
        data : {
            status : 'success',
            desc : '1'
        }
    }  );
};

module.exports.initAdminUser = function ( req, res, next ) {
    User.findOne({ username : 'admin' }, function(error, data) {
        if ( ! error) {
            if (!data) {
                var adminUser = new User({
                    username: 'admin',
                    password: 'admin',
                    role: 'Admin'
                });
                adminUser.save(function(error) {
                    if (!error) {
                        adminUser.save();
                        console.log('Creating Admin user');
                    } else {
                        console.log('Admin user already exist');
                    }
                });
            } else {
                console.log('Admin user already exist');
            }
        }
    });


};

