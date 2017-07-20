var express = require( 'express' ),
    mongoose = require( 'mongoose' );

/*mongoose.connect( 'mongodb://localhost/contacts' );*/

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
    admin_basic = require( './modules/basic_auth_middleware' ),
    admin_oauth = require( './modules/oauth2-middleware' ),

    authrouter = require( './routes/auth' ),

    app = express(),
    port = process.env.PORT || 8180,
    staticPath = path.join( __dirname, 'public' ),
    avatarPath = path.join( __dirname, './avatar' );

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
    saveUninitialized: true,
    cookie : { maxAge : 300 * 1000 }
}));

admin.initAdminUser();

app.use( express.static( staticPath ) );
app.use( '/avatar', express.static( avatarPath ) );

app.use( '/', routes );
app.use( '/auth',cache( 'minutes', 2 ), authrouter );

app.use( '/api/v1',admin_oauth.authorizationRequired,  apirouter_v1 );
app.use( '/api/v2', admin.authorize, cache( 'minutes', 5 ), apirouter_v2  );

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

module.exports = app;

app.listen( port );
