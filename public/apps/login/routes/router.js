/**
 * Created by Administrator on 2017/6/26.
 */
var Backbone = require( 'backbone' ),
    App = require( '../app' ),
    LoginRouter;

LoginRouter = module.exports = Backbone.Router.extend( {
    routes : {
        login : 'login',
        logout : 'logout'
    },
    login : function () {
        var app = this.startApp();
        app.showLogin();
    },

    // drop session data
    logout : function () {
        var app = this.startApp();
        app.logout();
    },
    startApp : function () {
        "use strict";
        return window.app.startSubApplication( App );
    }
} );

window.app.Routers.UsersRouter = LoginRouter;