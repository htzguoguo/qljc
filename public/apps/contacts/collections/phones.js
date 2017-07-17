/**
 * Created by Administrator on 2017/6/14.
 */

var Backbone = require( 'backbone' ),
    PhoneModel = require( '../models/phone' ),
    PhonesCollection;

PhonesCollection = module.exports = Backbone.Collection.extend( {
    model : PhoneModel
} );
