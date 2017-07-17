/**
 * Created by Administrator on 2017/6/2.
 */

var Backbone = require( 'backbone' ),
    ControllerBase = require( '../../../utils/basecontroller' ),
    _ = require( 'underscore' ),
    ContactViewLayout = require( '../views/contactviewlayout' ),
    ContactViewWidget = require( '../views/contactviewwidget' ),
    ContactAbout = require( '../views/contactabout' ),
    ContactCallLog = require( '../views/contactcalllog' ),
    ContactViewController;

ContactViewController = module.exports = function ( options ) {
    var deleteContact;
    this.mainRegion = options.mainRegion;
    _.extend( this, Backbone.Events );

    this.showContact = function ( contact ) {
        var layout = new ContactViewLayout(),
            contactWidget = new ContactViewWidget( { model : contact } ),
            contactAbout = new ContactAbout( { model : contact } ),
            contactCallLog = new ContactCallLog( { model : contact } );
        this.mainRegion.show( layout );
        layout.getRegion( 'widget' ).show( contactWidget );
        layout.getRegion( 'about' ).show( contactAbout );
        layout.getRegion( 'calls' ).show( contactCallLog );

        this.listenTo( contactAbout, 'contact:delete', deleteContact );
    };

    deleteContact = function ( contact ) {



        var app = this;
        this.askConfirmation( 'The contact will be deleted', false, function ( isConfirmed ) {
            if ( isConfirmed ) {
                contact.destroy( {
                    success : function () {
                        app.successMessage( 'The contact was deleted' );
                        window.app.router.navigate('/contacts', true);
                    },
                    error : function () {
                        app.errorMessage( 'Ooops... Something was wrong' );
                    }
                } );
            }
        } );
    }


};

_.extend( ContactViewController.prototype, ControllerBase );

