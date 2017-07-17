/**
 * Created by Administrator on 2017/6/6.
 */

var Backbone = require( 'backbone' ),
    ControllerBase = require( '../../../utils/basecontroller' ),
    _ = require( 'underscore' ),
    PhonesCollection = require( '../collections/phones' ),
    EmailsCollection = require( '../collections/emails' ),
    ContactFormLayout = require( '../views/contactformlayout' ),
    ContactForm = require( '../views/contactform' ),
    ContactPreview = require( '../views/contactpreview' ),
    PhonesView = require( '../views/phonelist' ),
    EmailsView = require( '../views/emaillist' ),
    ContactEditorController;

ContactEditorController = module.exports = function ( options ) {
    this.mainRegion = options.mainRegion;
    _.extend( this, Backbone.Events );

    this.showEditor = function ( contact ) {
        var phonesData = contact.get( 'phones' ) || [],
            emailsData = contact.get( 'emails' ) || [];
        this.phones = new PhonesCollection( phonesData );
        this.emails = new EmailsCollection( emailsData );

        var layout = new ContactFormLayout( { model : contact } ),
            phonesView = new PhonesView( { collection : this.phones } ),
            emailsView = new EmailsView( { collection : this.emails } ),
            form = new ContactForm( { model : contact } ),
            preview = new ContactPreview( { model : contact, controller : this } );

        this.mainRegion.show( layout );
        layout.getRegion( 'form' ).show( form );
        layout.getRegion( 'preview' ).show( preview );
        form.getRegion( 'phones' ).show( phonesView );
        form.getRegion( 'emails' ).show( emailsView );

        this.listenTo( form, 'form:cancel', this.cancel );
        this.listenTo( form, 'form:save', this.saveContact );
        this.listenTo( form, 'phone:add', this.addPhone );
        this.listenTo( form, 'email:add', this.addEmail );
        this.listenTo( phonesView, 'item:phone:deleted', function ( view, phone ) {
            this.deletePhone( phone );
        } );
        this.listenTo( emailsView, 'item:email:deleted', function ( view, email ) {
            this.deleteEmail( email );
        } );

        this.listenTo( preview, 'avatar:selected', function ( blob ) {
            this.avatarSelected = blob;
            console.log( 'contact.isNew', contact.isNew()  );
            if ( ! contact.isNew() ) {
                this.uploadAvatar( contact, blob );
            }
        } );
    };

    this.uploadAvatar = function ( contact, options) {
        var app = this;
        this.trigger( 'avatar:uploading:start' );
        contact.uploadAvatar( this.avatarSelected, {
            progress : function ( length, uploaded, precent ) {
                app.trigger( 'avatar:uploading:progress', length, uploaded, precent );
            },
            success : function () {
                app.trigger( 'avatar:uploading:done' );
                if ( options && _.isFunction( options.success ) ) {
                    options.success();
                }
            },
            error : function ( err ) {
                app.trigger( 'avatar:uploading:error', err );
            }
        } );
    };

    this.deletePhone = function ( phone ) {
        this.phones.remove( phone );
    };

    this.deleteEmail = function ( email ) {
        this.emails.remove( email );
    };

    this.addPhone = function () {
        this.phones.add( {} );
    };

    this.addEmail = function () {
        console.log( 'addEmil' );
        this.emails.add( {} );
    };

    this.cancel = function () {
        this.askConfirmation( 'Changes will be lost', true, function ( isConfirm ) {
            if ( isConfirm ) {
                window.app.router.navigate( '/contacts', true );
            }
        } );
    };
    this.saveContact = function ( contact ) {
        var app = this,
            wasNew = false,
            phonesData = this.phones.toJSON(),
            emailsData = this.emails.toJSON();
        /*if ( ! this.emails.isValid( true ) ) {
            return;
        }*/
        var emailsHasError = _.some(this.emails.models, function(m) {
            return m.validationError;
        });
        if ( emailsHasError ) {
            return;
        }
        contact.set( {
            phones : phonesData,
            emails : emailsData
        } );
        if ( ! contact.isValid( true ) ) {
            return;
        }
        wasNew = contact.isNew();
        if ( contact.has( 'avatar' ) ) {
            contact.unset( 'avatar' );
        }
        function notifyAndRedirect() {
            app.notifySuccess( 'contact was saved' );
            window.app.router.navigate( '/contacts', true );
        }
        contact.save( null , {
            success : function () {
                        if ( ! wasNew ) {
                            notifyAndRedirect();
                            return;
                        }
                        if (   app.avatarSelected ) {
                            app.uploadAvatar( contact, {
                                success : notifyAndRedirect
                            } );
                        }else {
                            notifyAndRedirect();
                        }
                    },
            error : function () {
                   app.notifyError( 'something goes wrong' );
            }});
    };
};

_.extend( ContactEditorController.prototype, ControllerBase );

