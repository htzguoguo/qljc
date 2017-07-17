/**
 * Created by Administrator on 2017/6/14.
 */

var Backbone = require( 'backbone' ),
    EmailModel;

EmailModel = module.exports = Backbone.Model.extend( {
    defaults : {
        description : '',
        email : ''
    },
    validation : {
        email : {
            required : true,
            pattern: 'email'
        }
    }
} );
