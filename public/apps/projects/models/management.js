/**
 * Created by Administrator on 2017/8/7.
 */

/**
 * Created by Administrator on 2017/7/26.
 */

var Backbone = require( 'backbone' ),
    _ = require( 'underscore' ),
    Management;

Management = module.exports = Backbone.Model.extend(
    {
        urlRoot : 'api/v1/managements',
        idAttribute: 'managementname',
        defaults : {
            createtime : (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate()
        },
        toJSON : function () {
            var result = Backbone.Model.prototype.toJSON.call( this );
            if ( ! _.isEmpty( this.get( 'createtime' ) ) ) {
                var  dt = new Date(Date.parse(this.get( 'createtime' ))) ;
                if ( dt && _.isDate( dt ) ) {
                    result.createtime = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
                }
            }
            return result;
        },
        validation : {
            managementname : {
                required : true,
                msg: '管理单位名称不能为空'
            },
            managementnumber : {
                required : true,
                msg: '管理单位编号不能为空'
            }
        }
    }
);