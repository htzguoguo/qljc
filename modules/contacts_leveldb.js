/**
 * Created by Administrator on 2017/4/24.
 */

var levelup  = require( 'levelup' ),
    db = levelup( './contact', { valueEncoding : 'json' } );

db.put('+359777123456', {
    "firstname": "Joe",
    "lastname": "Smith",
    "title": "Mr.",
    "company": "Dev Inc.",
    "jobtitle": "Developer",
    "primarycontactnumber": "+359777123456",
    "othercontactnumbers": [
        "+359777456789",
        "+359777112233"],
    "primaryemailaddress": "joe.smith@xyz.com",
    "emailaddresses": [
        "j.smith@xyz.com"],
    "groups": ["Dev","Family"]
});

module.exports.list = function ( callback ) {
    "use strict";
    var is_first = true, result = [];
     db.createReadStream().
     on( 'data', function ( data ) {
         if ( is_first ) {
             result.push( '[' );
         }else {
             result.push( ',' );
         }
         result.push( JSON.stringify( data ) );
         is_first = false;
     } ).
     on( 'end', function () {
         result.push( ']' );
         callback( result.join( '' ) );
     } );
};

module.exports.query = function ( number, callback ) {
    "use strict";
    db.get( number,  callback );

};

module.exports.create = function ( number, contact, callback ) {
    "use strict";
    db.put( number, contact, callback );
};

module.exports.delete = function ( number, callback ) {
    "use strict";
    db.del( number, callback );
};


module.exports.query_by_arg = function ( arg, value, callback ) {
    "use strict";
     var is_first = false, result = [];
    db.createReadStream().
    on( 'data', function ( data ) {
        if ( is_first ) {
            result.push( '[' );
        }else {
            result.push( ',' );
        }
        if ( data.value[ arg ]  === value ) {
            result.push( JSON.stringify( data ) );
            is_first = false;
        }
    } ).
    on( 'end', function () {
        result.push( ']' );
        callback( result.join( '' ) );
    } );

};

module.exports.list_groups = function () {
    "use strict";
    return null;
};

module.exports.get_members = function ( group_name ) {
    "use strict";
    return null;
};



