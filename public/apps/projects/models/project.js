/**
 * Created by Administrator on 2017/7/18.
 */
/**
 * Created by Administrator on 2017/5/21.
 */

var Backbone = require( 'backbone' ),
    _ = require( 'underscore' ),
    Project;

Project = module.exports = Backbone.Model.extend(
    {
        urlRoot : 'api/v1/projects',
        idAttribute: 'projectnumber',
        defaults : {
            projectname: ''
        },
        toJSON : function () {
            var result = Backbone.Model.prototype.toJSON.call( this );
            return result;
        },
        validation : {
            projectname : {
                required : true,
                msg: '检测项目名称不能为空'
            }
        }
    }
);