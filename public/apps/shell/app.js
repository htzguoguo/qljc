/**
 * Created by Administrator on 2017/5/24.
 */

var MainView = require( './views/shell' ),
    AppBase = require( '../../utils/baseapp' ),
    _ = require( 'underscore' );

_.extend( AppBase.prototype, {
    ShowMain : function () {
        "use strict";
        var mainView = this.startController(MainView);
        $( 'body' ).append( mainView.template );
        window.app.router.navigate('contacts', {trigger: true});
    }
} );
module.exports = AppBase;