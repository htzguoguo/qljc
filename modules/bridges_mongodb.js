/**
 * Created by Administrator on 2017/7/21.
 */

var
    Bridge = require( './schema/bridge' ),
    helper = require( './mongodb_helper' ),
    crispy = require( 'crispy-string' ),
    ID_LENGTH = 20;

module.exports.query_by_arg = function ( arg, value, res ) {
     helper.query_by_arg( Bridge, arg, value, res );
};

module.exports.query = function ( number, res ) {
     helper.query( Bridge, 'bridgename', number, res );
};

module.exports.list = function ( res ) {
    "use strict";
    helper.list( Bridge, 'filldate', res );
};

module.exports.paginate = function ( req, res ) {
     helper.paginate( Bridge, req, res );
};
