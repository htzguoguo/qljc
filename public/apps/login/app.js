/**
 * Created by Administrator on 2017/6/26.
 */

var AppBase = require( '../../utils/baseapp' ),
    LoginView = require( './views/loginView' ),
    LoginSession = require( './models/loginsession' ),
    _ = require( 'underscore' ),
    App;

App = module.exports = function ( options ) {
    this.currentController = null;
    this.mainRegion = options.mainRegion;
    this.bodyRegion = options.bodyRegion;

    this.showLogin = function () {
        var loginView = this.startController(LoginView);
        this.mainRegion.show( loginView );
    };
    this.logout = function () {
        LoginSession.dropAuth();
        window.app.router.navigate('login', {trigger: true});
    }
};

_.extend( App.prototype, AppBase );






