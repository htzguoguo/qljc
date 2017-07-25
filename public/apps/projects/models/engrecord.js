/**
 * Created by Administrator on 2017/7/25.
 */

var Backbone = require( 'backbone' ),
    Model;

Model = module.exports = Backbone.Model.extend( {
    defaults : {
        /* 开工日期*/
        startdate : '',
        /* 竣工日期*/
        completiondate : '',
        /* 修建类别*/
        buildcategory : '',
        /* 修建原因*/
        constructionreasons : '',
        /* 工程范围*/
        engineeringscope : '',
        /* 工程费用*/
        engineeringcosts : '',
        /* 经费来源*/
        sourcefunding : '',
        /* 质量评定*/
        qualityassessment : '',
        /* 建设单位*/
        constructionunit : '',
        /* 设计单位*/
        designunit : '',
        /* 施工单位*/
        builder : '',
        /* 监理单位*/
        supervisionunit : ''
    },
    validation : {
        startdate : {
            required : true,
            msg: '开工日期不能为空'
        }
    }
} );

