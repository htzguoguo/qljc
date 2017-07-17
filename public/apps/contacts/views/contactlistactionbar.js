/**
 * Created by Administrator on 2017/6/1.
 */

var ModelView = require( '../../../utils/modelview' ),
    ContactModel = require( '../models/contact' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/contactlistaction.html', 'utf8' ),
    View;

View = module.exports = ModelView.extend( {
    className : 'options-bar col-xs-12',
    template : template,
    events : {
        'click .createcontact' : 'addContract'
    },
    addContract : function () {
        "use strict";
       /* var contact = new ContactModel(),
            app = this;
        contact.set( {
            "firstname": "errt",
            "lastname": "sssssss",
            "title": "bnm.",
            "company": "tygb",
            "jobtitle": "Developer",
            "primarycontactnumber": "12345678",
            "primaryemailaddress": "joe.smith@xyz.com",
        } );
        this.collection.create( contact );*/
       window.app.router.navigate( '/contacts/new', true );
    }
} );
