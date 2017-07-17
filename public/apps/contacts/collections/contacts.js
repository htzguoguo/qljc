/**
 * Created by Administrator on 2017/5/24.
 */

var Backbone = require( 'backbone' ),
    Contact = require( '../models/contact' ),
    Contacts;

Contacts = module.exports = Backbone.Collection.extend( {
    url : 'api/v1/contacts',
    model : Contact
} );
