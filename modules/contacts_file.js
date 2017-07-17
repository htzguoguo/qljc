/**
 * Created by Administrator on 2017/4/11.
 */
var fs = require( 'fs' ),
    path =  __dirname +  '/data/contacts.json',
    contacts = null,
    groups = [],
    groups_contacts = {};

(function read_json_file() {
    "use strict";
    console.log( 'init read_json_file' );

    contacts =  JSON.parse(fs.readFileSync( path, 'utf8' ));
    contacts.forEach( function ( contact ) {
        contact.groups.forEach( function ( group ) {
            if ( groups.indexOf( group ) === -1 ) {
                groups.push( group );
            }
            if ( ! groups_contacts[ group ] ) {
                groups_contacts[ group ] = [];
            }
            groups_contacts[ group ].push( contact );
        } );
    } );
})();

module.exports.list = function () {
    "use strict";
    return contacts;
};

module.exports.query = function ( number ) {
    "use strict";
    var len = contacts.length, i;
    for ( i = 0 ; i < len; i++ ) {
        if ( contacts[ i ].primarycontactnumber === number ) {
            return contacts[ i ];
        }
    }
    return null;
};

module.exports.query_by_arg = function ( arg, value ) {
    "use strict";
    var len = contacts.length, i;
    for ( i = 0 ; i < len; i++ ) {
        if ( contacts[ i ][ arg ] === value ) {
            return contacts[ i ];
        }
    }
    return null;
};

module.exports.list_groups = function () {
    "use strict";
    return groups;
};

module.exports.get_members = function ( group_name ) {
    "use strict";
    return groups_contacts[ group_name ];
};







