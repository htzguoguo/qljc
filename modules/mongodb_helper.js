/**
 * Created by Administrator on 2017/7/21.
 */

var helper = require( './http_helper' );

module.exports.query_by_arg = function ( schema, arg, value, res ) {
    "use strict";
    var filter = {};
    if ( arg instanceof Array ) {
        arg.forEach( function ( a, index ) {
            filter[ a ] = value[ index ];
        })
    }else {
        filter[ arg ] = value;
    }
    schema.find( filter, function ( error, data ) {
        if ( error ) {
            helper.InternalServerError( res, error, { arg : arg, value : value } );
        }else {
            if ( ! data ) {
                helper.ResourceNotFound( res, { arg : arg, value : value } );
            }else {
                helper.ResourceFound( res, data );
            }
        }
    });
};

module.exports.query = function ( schema, key, number, res ) {
    "use strict";
    var filter = {};
    filter[ key ] = number;
    schema.findOne( filter, function ( error, data ) {
        if ( error ) {
            helper.InternalServerError( res, error, filter );
        }else {
            if ( ! data ) {
                helper.ResourceNotFound( res , filter);
            }else {
                helper.ResourceFound( res, data );
            }
        }
    } );
};

module.exports.list = function ( schema, sort,  res ) {
    "use strict";
    schema.find( {}, function ( error, data ) {
        if ( error ) {
            helper.InternalServerError( res );
        }else {
            helper.ResourceFound( res, data );
        }
    } ).sort({ sort: -1});
};

module.exports.paginate = function ( schema, req, res ) {
    schema.paginate( {}
        ,{ page : req.query.page, limit : req.query.limit }
        , function ( error, data ) {
            if ( error ) {
                helper.InternalServerError( res );
            }else {
                helper.ResourceFound( res, {
                    object : 'contacts',
                    items_count : data.total,
                    page_count : data.pages,
                    item_count : data.limit,
                    page_index : data.page,
                    result : data.docs
                } );
            }
        }
    );
};

module.exports.update = function ( schema, fields, obj, key, value, toNewSchema, toExistSchema, res ) {
    "use strict";
    var newschema;
    var filter = {};
    filter[ key ] = value;
    schema.findOne( filter, function ( error, data ) {
        if ( error ) {
            helper.InternalServerError( res, error, filter );
        }else {
            newschema = toNewSchema(fields, obj , schema);
            if ( !data ) {
                newschema.save( function ( error ) {
                    if ( ! error ) {
                        newschema.save();
                    }
                } );
                helper.ResourceCreated( res, newschema );
            }else {
                toExistSchema(fields, data, newschema );
                data.save( function ( error ) {
                    if ( ! error ) {
                        data.save();
                    }
                    helper.ResourceUpdated(res, data );
                } );
            }
        }
    } );
};

module.exports.remove = function ( schema, key, number, res ) {
    "use strict";
    schema.findOne( { key : number }, function ( error, data ) {
        if ( error ) {
            helper.InternalServerError( res, error, { key : number } );

        }else {
            if ( ! data ) {
                helper.ResourceNotFound( res , { key : number });
            }else {
                data.remove( function ( error ) {
                    if ( error ) {
                        helper.InternalServerError( res, error, { key : number } );
                    }else {
                        data.remove();
                        helper.ResourceDeleted( res );
                    }
                } );
            }
        }
    } );
};

module.exports.toNewSchema = function ( fields, body, schema ) {
    var data = {}, i, len, key;
    len = fields.length;
    for ( i = 0; i < len; i++ ) {
        key = fields[ i ];
        data[ key ] = body[ key ]
    }
    return new schema( data );
};

module.exports.toExistSchema = function ( fields, data, schema ) {
    var  i, len, key;
    len = fields.length;
    for ( i = 0; i < len; i++ ) {
        key = fields[ i ];
        data[ key ] = schema[ key ];
    }
};

module.exports.getFields = function ( schema ) {
    var fields = [];
    schema.schema.eachPath(function(path) {
        if ( path !== '_id' && path !== '__v' ) {
            fields.push( path );
        }
    });
    return fields;
};



