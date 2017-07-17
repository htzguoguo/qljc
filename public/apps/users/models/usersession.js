/**
 * Created by Administrator on 2017/4/18.
 */
var Backbone = require( 'backbone' ),
    Cookies = require( 'js-cookie' ),
    _ = require( 'underscore' );



module.exports = Backbone.Model.extend( {
    defaults : {
        accessToken : null,
        userName : null
    },
    initialize : function () {
        "use strict";
        this.load();
    },
    authenticated : function () {
        "use strict";
        return ! _.isEmpty( Cookies.get( 'accessToken' ) );
    },
    load : function () {
        "use strict";
        this.userName = Cookies.get( 'name' );
        this.accessToken = Cookies.get( 'accessToken' );
    },
    save : function ( authHash ) {
        "use strict";
        Cookies.set( 'name', authHash.name );
        Cookies.set( 'accessToken', authHash.accessToken );
    },
    destory : function () {
        "use strict";
        $.cookie( 'name', '' );
        $.cookie( 'accessToken', '' );
    }
} );
