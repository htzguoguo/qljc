/**
 * Created by Administrator on 2017/8/7.
 */

var
    Management = require( './schema/management' ),
    helper = require( './mongodb_helper' ),
    FILTER_KEY = 'managementname',
    SORT_FIELD = 'createtime',
    Fields =  helper.getFields( Management );

module.exports.query_by_arg = function ( arg, value, res ) {
    helper.query_by_arg( Management, arg, value, res );
};

module.exports.query = function ( number, res ) {
    helper.query( Management, FILTER_KEY, number, res );
};

module.exports.list = function ( res ) {
    "use strict";
    helper.list( Management, SORT_FIELD, res );
};

module.exports.paginate = function ( req, res ) {
    helper.paginate( Management, req, res );
};

module.exports.update = function ( management, res ) {
    "use strict";
    helper.update( Management, Fields, management,  FILTER_KEY, management.managementname, helper.toNewSchema, helper.toExistSchema, res );

};

module.exports.remove = function ( name, res ) {
    "use strict";
    helper.remove( Management, FILTER_KEY , name, res  );
};



