/**
 * Created by Administrator on 2017/6/14.
 */

var Backbone = require( 'backbone' ),
    Email = require( '../models/email' ),
    Emails;

Emails = module.exports = Backbone.Collection.extend( {
    model : Email
} );
