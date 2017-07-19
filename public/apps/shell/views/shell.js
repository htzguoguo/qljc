/**
 * Created by Administrator on 2017/5/24.
 */

var Layout = require( '../../../utils/layout' ),
    fs = require( 'fs' ),
    Mustache = require( 'mustache' ),
    template = fs.readFileSync( __dirname + '/templates/shell.html', 'utf8' ),
    navigation_temp = fs.readFileSync( __dirname + '/templates/navigationbar.html', 'utf8' ),
    ShellView;

ShellView = module.exports = Layout.extend( {
     template : template,
     regions : {
        menu : '.tjx-top-first-menu',
        main : '.content-wrapper',
        main_head : '#tjx-shell-main-head',
        footer : '.tjx-bottom-booter',
        rightmodal : '#todo-task-modal'
    },
    initialize : function () {
        this.listenTo(window.app, 'app:navigation:change', function ( items ) {
             this.$( '.qljc-navigation-bar' ).html(Mustache.to_html( navigation_temp, { items : items } ));
        });
    }
} );

