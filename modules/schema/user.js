/**
 * Created by Administrator on 2017/6/20.
 */

var mongoose = require( 'mongoose' ),
    Bcrypt = require( 'bcrypt-nodejs' ),
    SALT_FACTOR = 10,
    UserSchema,
    User;

UserSchema = new mongoose.Schema( {
    username : { type : String, require : true, index : { unique : true } },
    password : { type : String, require : true },
    createAt : { type : Date, default : Date.now },
    displayName : String,
    bio : String,
    role : String
} );

var noop = function () {};

UserSchema.pre( 'save', function ( done ) {
    var user = this;
    if ( !user.isModified( 'password' ) ) {
       return done();
    }
    Bcrypt.genSalt( SALT_FACTOR, function ( err, salt ) {
        if ( err ) {
            return done( err );
        }
        Bcrypt.hash( user.password, salt, noop, function ( err, hashedPassword ) {
            if ( err ) {
                return done( err );
            }
            user.password = hashedPassword;
            done();
        } );
    } );
} );

UserSchema.methods.checkPassword = function ( guess, done ) {
    Bcrypt.compare( guess, this.password, function ( err, isMatch ) {
        done( err, isMatch );
    } );
};

UserSchema.methods.name = function () {
    return   this.displayName || this.username;
};




User = mongoose.model( 'User', UserSchema );
module.exports = User;

