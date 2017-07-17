/**
 * Created by Administrator on 2017/6/21.
 */

var Passport = require( 'passport' ),
    LocalStrategy = require( 'passport-local' ).Strategy,
    PassportHttp = require( 'passport-http' ).BasicStrategy,
    User = require( './modules/schema/user' );

module.exports = function () {

    Passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    Passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

 /* Passport.use( 'login', new LocalStrategy(
      function ( username, password, done ) {
          console.log( 'login' );
          User.findOne( { username : username }, function ( err, user ) {
              if ( err ) {
                  return done( err );
              }
              if ( !user ) {
                  return done( null, false, { message : 'No user has that username' }  );
              }
              user.checkPassword( password, function ( err, isMatch ) {
                  if ( err ) {
                      return done( err );
                  }
                  if ( isMatch ) {
                      return done( null, user );
                  }else {
                      return  done( null, false , { message : 'Invalid password' } );
                  }
              } );


          } );
      }
  ) );*/
    Passport.use("login", new LocalStrategy(function(username, password, done) {
        console.log( 'login', username, password );
        User.findOne({ username: username }, function(err, user) {
            console.log( err );
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: "No user has that username!" });
            }
            user.checkPassword(password, function(err, isMatch) {
                if (err) { return done(err); }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Invalid password." });
                }
            });
        });
    }));

};
