/**
 * Created by Administrator on 2017/7/26.
 */

var Backbone = require( 'backbone' ),
    _ = require( 'underscore' ),
    Task;

Task = module.exports = Backbone.Model.extend(
    {
        urlRoot : 'api/v1/tasks',
        idAttribute: 'taskname',
        defaults : {
            detectiontype : '经常性检查',
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
            taskname : {
                required : true,
                msg: '检测任务名称不能为空'
            },
            tasknumber : {
                required : true,
                msg: '任务编号不能为空'
            }
        }
    }
);