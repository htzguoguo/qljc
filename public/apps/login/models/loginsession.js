/**
 * Created by Administrator on 2017/6/26.
 */

var Backbone = require( 'backbone' ),
    MainApp = require( '../../../app' );

// Save an authentacition token
module.exports.saveAuth = function ( type, token ) {
        var authConfig = type + ':' + token;
        sessionStorage.setItem( 'auth', authConfig );
        setAuth( type, token );
    };

// Remove authorization token
module.exports.dropAuth = function () {
    sessionStorage.removeItem( 'auth' );
    setAjax( null );
};

// Set an anthorization token
var setAuth = function ( type, token ) {
        var authString = type + ' ' + token;
        setAjax( authString );
    };

// Set Authorization header for authentication
var  setAjax = function ( authString ) {
        var headers = {};
        if ( authString ) {
            headers = {
                Authorization : authString
            };
        }
        console.log( 'setAjax headers',  headers);
        Backbone.$.ajaxSetup( {
            statusCode : {
                401 : function () {
                   window.location.replace('/#login');
                }
            },
            headers: headers
        } );
    };

// load authorization data from sessionStorage
module.exports.initializeAuth = function () {
        var authConfig = sessionStorage.getItem( 'auth' );
        if ( !authConfig ) {
            return window.location.replace('/#login');
        }
        var splittedAuth = authConfig.split( ':' );
        var type = splittedAuth[ 0 ],
            token = splittedAuth[ 1 ];
        setAuth( type, token );
    };

