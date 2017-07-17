/**
 * Created by Administrator on 2017/4/17.
 */

var fs = require( 'fs' ),
    Base = require( '../../../utils/modelview' ),
    User = require( '../models/user' ),
    LoginAccount = require( '../models/loginaccount' ),
    template = fs.readFileSync( __dirname + '/templates/profile.html', 'utf8' );

module.exports = Base.extend( {
    template  :  template,
    initialize : function () {
        "use strict";

    },
    updateView : function ( container ) {
        "use strict";
        var user = new User( {
                id : '3'
            } ),
            app = this;
        user.fetch( {
            success : function ( model, response ) {
                app.model = model;
                app.render();
                container.html( app.el );
            },
            error : function () {
                window.app.router.navigate('login', {trigger: true});
            }
        } );
    },
    events : {
        'click .logout' : 'logout'
    },
    logout : function () {
        "use strict";
        var user = new LoginAccount( {
            id : 1
        } );
        user.logout( function ( auth ) {
            console.log( auth );
        } );
    }
} );
