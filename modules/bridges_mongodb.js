/**
 * Created by Administrator on 2017/7/21.
 */

var
    Bridge = require( './schema/bridge' ),
    helper = require( './mongodb_helper' ),
    crispy = require( 'crispy-string' ),
    ID_LENGTH = 20,
    Fields =  helper.getFields( Bridge );

module.exports.query_by_arg = function ( arg, value, res ) {
     helper.query_by_arg( Bridge, arg, value, res );
};

module.exports.query = function ( number, res ) {
     helper.query( Bridge, 'id', number, res );
};

module.exports.list = function ( res ) {
    "use strict";
    helper.list( Bridge, 'filldate', res );
};

module.exports.paginate = function ( req, res ) {
     helper.paginate( Bridge, req, res );
};

module.exports.update = function ( bridge, res ) {
    "use strict";
    helper.update( Bridge, Fields, bridge,  'id', bridge.id, toNewSchema, helper.toExistSchema, res );
};

module.exports.remove = function ( name, res ) {
    "use strict";
     helper.remove( Bridge, 'id', name, res  );
};

function toNewSchema( fields, body, schema ) {
    var data = helper.toNewSchema( fields, body, schema );
    data.id = helper.makeId();
    return data;
}


