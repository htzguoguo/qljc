/**
 * Created by Administrator on 2017/5/16.
 */

var ContactView = require( './controllers/contactview' ),
    ContactEditor = require( './controllers/contacteditor' ),
    ContactList = require( './controllers/contactlist' ),
    ContactModel = require( './models/contact' ),
    ContactCollection = require( './collections/contacts' ),
    AppBase = require( '../../utils/baseapp' ),
    _ = require( 'underscore' ),
    App, C;

App = function ( options ) {
    "use strict";
    this.currentController = null;
    this.mainRegion = options.mainRegion;
    this.bodyRegion = options.bodyRegion;
    this.GetName = function () {
        "use strict";
        return 'ContactApp';
    };
    this.showContactById = function ( id ) {
        "use strict";
        var contact = new ContactModel( {
                id :   id,
                primarycontactnumber : id
            } ),
            app = this;
        contact.fetch( {
            success : function ( contact ) {
                app.ShowViewer( contact );
            },
            error : function () {
                // window.app.router.navigate('login', {trigger: true});
            }
        } );
    };
    this.ShowContactList = function () {
        "use strict";
        var contracts = new ContactCollection(),
            app = this;

        contracts.fetch(
            {
                success : function ( collection ) {
                    var contactList = app.startController(ContactList);
                    contactList.showList(collection);
                },
                error : function () {

                }
            }
        );
    };
    this.ShowViewer = function ( contact ) {
        var contactViewer =  this.startController(ContactView);
        contactViewer.showContact( contact );
    };

    this.ShowNewContactForm = function () {
        var contactEditor = this.startController(ContactEditor);
       /* contactEditor.showEditor( new ContactModel( {
            primarycontactnumber : Math.random().toString(36).substring(7)
        } )  );*/
        contactEditor.showEditor( new ContactModel()  );
    };

    this.ShowContactEditorById = function ( id ) {
        var contact = new ContactModel( {
                id :   id,
                primarycontactnumber : id
            } ),
            app = this;
        contact.fetch( {
            success : function ( contact ) {
                var contactViewer = app.startController(ContactEditor);
                contactViewer.showEditor(contact);
            },
            error : function () {
                // window.app.router.navigate('login', {trigger: true});
            }
        } );
    };


};

_.extend( App.prototype, AppBase );

module.exports = App;






