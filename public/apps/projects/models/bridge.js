/**
 * Created by Administrator on 2017/7/21.
 */

var Backbone = require( 'backbone' ),
    _ = require( 'underscore' ),
    Bridge;

Bridge = module.exports = Backbone.Model.extend(
    {
        urlRoot : 'api/v1/bridges',
        idAttribute: 'bridgename',
        defaults : {
            bridgename: '',
            filldate : (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate()
        },
        toJSON : function () {
            var result = Backbone.Model.prototype.toJSON.call( this );
            if ( ! _.isEmpty( this.get( 'filldate' ) ) ) {
                var  dt = new Date(Date.parse(this.get( 'filldate' ))) ;
                if ( dt && _.isDate( dt ) ) {
                    result.filldate = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
                }
            }
            return result;
        },
        validation : {
            bridgename : {
                required : true,
                msg: '桥梁名称不能为空'
            },
            bridgenumber : {
                required : true,
                msg: '桥梁编号不能为空'
            },
            routename : {
                required : true,
                msg: '线路名称不能为空'
            },
            routenumber : {
                required : true,
                msg: '线路编号不能为空'
            }
        }
    }
);
