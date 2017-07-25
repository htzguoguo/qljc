/**
 * Created by Administrator on 2017/7/25.
 */

var Backbone = require( 'backbone' ),
    Model;

Model = module.exports = Backbone.Model.extend( {
    defaults : {
        checkdate : '',
        /* 定期或特殊检查*/
        regularspecialinspection : '',
        /* 全桥评定等级*/
        bridgerating : '',
        /* 桥台与基础*/
        abutmentfoundation : '',
        /* 桥墩与基础*/
        pierfoundation : '',
        /* 地基冲刷*/
        foundationerosion : '',
        /* 上部结构*/
        superstructure : '',
        /* 支座*/
        bearing : '',
        /* 经常保养小修*/
        maintenanceminorrepair : '',
        /* 处治对策*/
        treatmentmeasures : '',
        /* 下次检查年份*/
        nextcheckyears : '',
    },
    validation : {
        checkdate : {
            required : true,
            msg: '检查年月不能为空'
        }
    }
} );
