/**
 * Created by Administrator on 2017/8/1.
 */

require('./modules/mongodb');
var Helper = require( './modules/mongodb_helper' );
var Bridge = require( './modules/schema/bridge' );


Bridge.find( {}, function ( error, data ) {
    var i, len, item;
    if ( error ) {

    }else {
        for ( i = 0; i < data.length; i++ )  {
            item = data[ i ];
            if ( ! item.id ) {
                item.id = Helper.makeId();
                item.save( function ( error ) {
                    if ( ! error ) {
                        item.save();
                    }
                } );
                console.log( 'bridge ' + item.bridgename  + ' id ok' );
            }
        }
    }
    console.log( 'all done' );
} ) ;

