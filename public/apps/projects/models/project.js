/**
 * Created by Administrator on 2017/7/18.
 */

var Backbone = require( 'backbone' ),
    _ = require( 'underscore' ),
    Project;

Project = module.exports = Backbone.Model.extend(
    {
        urlRoot : 'api/v1/projects',
        idAttribute: 'projectname',
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
            projectname : {
                required : true,
                msg: '检测项目名称不能为空'
            },
            projectnumber : {
                required : true,
                msg: '项目编号不能为空'
            }
        }
    }
);