/**
 * Created by Administrator on 2017/4/11.
 */

var fs = require( 'fs' ),
    path = __dirname + '/data/products',
    products = null,
    id_products = {};


(function read_json_file() {
    "use strict";
    var i, len;
    products = JSON.parse(fs.readFileSync( path ));
    len = products.length;
    for ( i = 0; i < len; i++ ) {
         id_products[ products[ i ].id ] = products[ i ];
    }
})();

module.exports.list = function () {
    "use strict";
    return products;
};

module.exports.get_by_id = function ( id ) {
    "use strict";
    return id_products[ id  ];
};

module.exports.get_parts = function ( id ) {
    "use strict";
    return id_products[ id ] ? id_products[ id ].parts : null ;
};

module.exports.insert_parts = function ( id, parts ) {
    "use strict";
    if (  id_products[ id ] ) {
       id_products[ id ].parts = id_products[ id ].parts.concat( parts );
    }
};

module.exports.delete_product = function ( id ) {
    "use strict";
    if ( id_products[ id ] ) {
        delete id_products[ id ];
        var len, i;
        len = products.length;
        for ( i = 0; i < len; i++ ) {
            if ( products[ i ].id === id  ) {
                products.splice( i, 1 );
                return;
            }
        }
    }
};

module.exports.create_product = function ( product ) {
    "use strict";
    if ( ! id_products[ product.id ] ) {
        id_products[ product.id ] = product;
        products.push( product );
    }
};

module.exports.update_product = function ( id, product ) {
    "use strict";
    if ( id_products[ id ] ) {
        var key, exist;
        exist = id_products[ id ];
        for ( key in product ) {
            if ( product.hasOwnProperty( key ) ) {
                if ( exist.hasOwnProperty(key) ) {
                    exist[ key ] = product[ key ];
                }
            }
        }
        

    }
};