/**
 * Created by Administrator on 2017/8/7.
 */

var mongoose = require( 'mongoose' ),
    mongoosePaginate = require( 'mongoose-paginate' ),
    managementSchema = new mongoose.Schema( {
        /* 管理单位名称*/
        managementname : {
            type : String,
            index : {
                unique : true
            }
        },
        /* 管理单位编号*/
        managementnumber : {
            type : String,
            index : {
                unique : true
            }
        },
        /* 创建时间*/
        createtime : Date,
        /* 地址*/
        address : String,
        /* 联系人*/
        contact : String,
        /* 联系电话*/
        phone : String,
        /* 邮箱*/
        email : String,
        /* 单位描述*/
        desc : String,
        /* 备注*/
        memo : String
    } );

managementSchema.plugin( mongoosePaginate );
module.exports = mongoose.model( 'Management', managementSchema );

