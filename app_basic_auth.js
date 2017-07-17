/**
 * Created by Administrator on 2017/6/20.
 */
var express = require( 'express' ),
    mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://localhost/contacts' );

var session = require( 'express-session' ),
    cookieParser = require( 'cookie-parser' ),
    path = require( 'path' ),
    logger = require( 'morgan' ),
    bodyParser = require( 'body-parser' ),
    errorHandler = require( 'errorhandler' ),
    expressPaginate = require( 'express-paginate' ),
    CacheControl = require( 'express-cache-control' ),
    cache = new CacheControl().middleware,
    routes = require( './routes/index' ),
    apirouter_v1 = require( './routes/api_v1' ),
    apirouter_v2 = require( './routes/api_v2' ),
    admin = require( './modules/user' ),
    authrouter = require( './routes/auth' ),
    Auth = require( 'basic-auth' ),
    User = require( './modules/schema/user' ),

    app = express(),
    port = process.env.PORT || 8180,
    staticPath = path.join( __dirname, 'public' ),
    avatarPath = path.join( __dirname, 'avatar' );

// view engine setup
app.set( 'views', path.join( __dirname , 'views' ) )
app.set( 'view engine', 'jade' );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended : false } ) );
app.use( expressPaginate.middleware( 10, 100 ) );

app.use(cookieParser('login'));
app.use(session({
    secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
    resave: true,
    saveUninitialized: true
}));

app.use( express.static( staticPath ) );
app.use( '/avatar', express.static( avatarPath ) );

app.use( function ( req, res, next ) {
    var credentials = Auth( req );
    if ( credentials === undefined ) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate',
            'Basic');
        res.end('Unauthorized');
    }else {
        authenticate( credentials.name, credentials.pass, res, next );
    }
} );

app.use( '/', routes );
app.use( '/auth', authrouter );
/*app.use( '/api/v1', admin.authorize,  apirouter_v1 );*/
app.use( '/api/v1',admin.authorize, cache( 'minutes', 5 ), apirouter_v1 );
app.use( '/api/v2', admin.authorize, apirouter_v2  );

//catch 404 and forward to error handler
app.use( function ( request, response, next ) {
    "use strict";
    var err = new Error( 'not found' );
    err.status = 404;
    next( err );
} );

// error handlers

// development error handler
// will print stacktrace
if ( app.get( 'env' ) === 'development' ) {
    app.use( errorHandler() );

    app.use( function ( error, request, response, next ) {
        "use strict";
        response.status( error.status || 500 );
        response.render( 'error', {
            message : error.message,
            error : error
        } );
    } );
}
// production error handler
// no stacktraces leak to user
app.use( function ( error, request, response, next ) {
    "use strict";
    response.status( error.status || 500 );
    response.render( 'error', {
        message : error.message,
        error : {}
    } );
} );



function authenticate( username, password, res, call ) {
    User.findOne( { username : username }, function ( err, user ) {
        if ( err ) {
           res.statusCode = 401;
           res.end(err);
           return;
        }else {
            user.checkPassword( password, function ( err, isMatch ) {
                if ( isMatch ) {
                    return call( null, username );
                }else {
                    res.statusCode = 401;
                    res.end('password failed');
                    return;
                }
            } );
        }
    }  );
}

module.exports = app;

app.listen( port );
