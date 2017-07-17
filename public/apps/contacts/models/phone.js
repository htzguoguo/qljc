/**
 * Created by Administrator on 2017/6/14.
 */

var Backbone = require( 'backbone' ),
    PhoneModel;

PhoneModel = module.exports = Backbone.Model.extend( {
    defaults : {
        description : '',
        phone : ''
    }
} );
