/**
 * Created by Administrator on 2017/7/24.
 */

var Backbone = require( 'backbone' ),
    StructureModel;

StructureModel = module.exports = Backbone.Model.extend( {
    defaults : {
        holenumber : '',
        span : '',
        form : '',
        material : ''
    },
    validation : {
        holenumber : {
            required : true
        }
    }
} );
