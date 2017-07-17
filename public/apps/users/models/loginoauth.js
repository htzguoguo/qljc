/**
 * Created by Administrator on 2017/6/26.
 */

var Backbone = require( 'backbone' ),
    LoginOauth;

LoginOauth = module.exports = Backbone.Model.extend( {
    defaults : {
        grant_type : 'password'
    },
    url : 'auth',
    login : function ( callback ) {
        "use strict";
        this.save( {}, {
            success : function ( model, response ) {
                if ( model.get('status') === 'online' ) {
                    callback( model.toJSON() );
                }
            },
            error : function ( model, response ) {
                callback( response.responseJSON  );
            }
        }  );
    },
    logout : function ( callback ) {
        "use strict";
        this.destroy( {
            success : function ( model, response ) {
                console.log( 'success',model, response );
                if ( response.status === 'offline' ) {
                    callback( response );
                }
            },
            error : function ( model, response ) {
                console.log( 'error' );
                callback( response.responseJSON  );
            }
        } );
    }
} );
