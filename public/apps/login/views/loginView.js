/**
 * Created by Administrator on 2017/6/26.
 */

var ModelView = require( '../../../utils/modelview' ),
    Backbone = require( 'backbone' ),
    LoginSession = require( '../models/loginsession' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/login.html', 'utf8' ),
    LoginView;

LoginView = module.exports = ModelView.extend( {
    template : template,
    className : 'row',
    events : {
         'click button' : 'makeLogin'
    },
    makeLogin : function ( event ) {
        var username = this.$el.find( '#username' ).val(),
            password = this.$el.find('#password').val(),
            authString = this.buildAuthString( username, password ),
            app = this;
        event.preventDefault();

        Backbone.$.ajax( {
            url : '/api/v1/contacts',
            headers : {
                Authorization : 'Basic ' + authString
            },
            success : function () {
                LoginSession.saveAuth( 'Basic', authString );
                window.app.router.navigate('contacts', {trigger: true});
            },
            error : function ( jqxhr ) {
                if ( jqxhr.status === 401 ) {
                    app.showError('user/password are not valid');
                }else {
                    app.showError( 'oops unknow error happen' );
                }
            }
        } );
    },
    buildAuthString : function ( username, password ) {
        return btoa( username + ':' + password );
    },
    showError : function ( message ) {
        this.$( '#message' ).html( message )
    }
} );
