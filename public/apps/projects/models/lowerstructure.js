/**
 * Created by Administrator on 2017/7/25.
 */


var Backbone = require( 'backbone' ),
    StructureModel;

StructureModel = module.exports = Backbone.Model.extend( {
    defaults : {
        piers : '',
        form : '',
        material : '',
        basicform : ''
    },
    validation : {
        piers : {
            required : true,
            msg: '墩台不能为空'
        }
    }
} );