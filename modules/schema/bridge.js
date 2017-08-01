/**
 * Created by Administrator on 2017/7/21.
 */

/**
 * Created by Administrator on 2017/7/19.
 */

var mongoose = require( 'mongoose' ),
    mongoosePaginate = require( 'mongoose-paginate' ),
    bridgeSchema = new mongoose.Schema( {

        id : String,
       /* 桥梁名称*/
        bridgename : {
            type : String,
            index : {
                unique : true
            }
        },
        /* 桥梁编号*/
        bridgenumber : {
            type : String,
            index : {
                unique : true
            }
        },
        /* 桥位中心桩号*/
        centerstation : String,

        /* 路线名称*/
        routename : String,
        /* 路线编号*/
        routenumber : String,
        /* 路线等级*/
        routelevel : String,

        /* 功能类型*/
        functiontype : String,
        /* 下穿通道名*/
        underchannelname : String,
        /* 下穿通道中心桩号*/
        underchannelcenterstation : String,

        /* 设计荷载*/
        designload : String,
        /* 通行载重*/
        trafficload : String,
        /* 弯斜坡度*/
        skewslope : String,

        /* 桥面铺装*/
        deckpavement : String,
        /* 管养单位*/
        custodyunit : String,
        /* 建成年限*/
        buildyear : String,
        /* 设计使用年限*/
        designlife : String,

        /* 桥长*/
        bridgelength : String,
        /* 桥面总宽*/
        bridgewidth : String,
        /* 车行道宽*/
        drivewaywidth : String,

        /* 桥面标高*/
        bridgeelevation : String,
        /* 桥下净高*/
        undernetheight : String,
        /* 桥上净高*/
        abovenetheight : String,

        /* 引道总宽*/
        approachwidth : String,
        /* 引道路面宽*/
        approachroadwide : String,
        /* 引道线形*/
        leadline : String,

        /* 上部结构*/
        superstructure : [ {
            /* 孔号*/
            holenumber : String,
            /* 跨径(m)*/
            span : String,
            /* 形式*/
            form : String,
            /* 材料*/
            material : String
        } ],

        /* 下部结构*/
        lowerstructure : [ {
            /* 墩台*/
            piers : String,
            /* 形式(m)*/
            form : String,
            /* 材料*/
            material : String,
            /* 基础形式*/
            basicform : String
        } ],

        /* 伸缩缝类型*/
        expansionjointtype : String,
        /* 支座形式*/
        bearingform : String,
        /* 地震动峰值加速度系数*/
        groundmotion : String,

        /* 桥台护坡*/
        abutmentslope : String,
        /* 护墩体*/
        protectpier : String,
        /* 调治构造物*/
        conditioningstructure : String,

        /* 常水位*/
        oftenwaterlevel : String,
        /* 设计水位*/
        designwaterlevel : String,
        /* 历史洪水位*/
        historicalfloodlevel : String,

        /* 设计图纸*/
        designdrawings : String,
        /* 设计文件*/
        designingdocuments : String,
        /* 施工文件*/
        constructiondocuments : String,

        /* 竣工图纸*/
        finisheddrawings : String,
        /* 验收文件*/
        acceptancedocuments : String,
        /* 行政文件*/
        administrativedocuments : String,

        /* 定期检查报告*/
        periodicalcheckreport : String,
        /* 特殊检查报告*/
        specialinspectionreport : String,
        /* 历次维修资料*/
        previousmaintenanceinformation : String,

        /* 档案号*/
        filenumber : String,
        /* 存档案*/
        archive : String,
        /* 建档时间*/
        filetime : String,

        /* 技术状况评定*/
        technicalstatusassessment : [
            {
                /* 检查年月*/
                checkdate : String,
                /* 定期或特殊检查*/
                regularspecialinspection : String,
                /* 全桥评定等级*/
                bridgerating : String,
                /* 桥台与基础*/
                abutmentfoundation : String,
                /* 桥墩与基础*/
                pierfoundation : String,
                /* 地基冲刷*/
                foundationerosion : String,
                /* 上部结构*/
                superstructure : String,
                /* 支座*/
                bearing : String,
                /* 经常保养小修*/
                maintenanceminorrepair : String,
                /* 处治对策*/
                treatmentmeasures : String,
                /* 下次检查年份*/
                nextcheckyears : String
            }
        ],

        /* 修建工程记录*/
        engineeringrecords : [
            {
                /* 开工日期*/
                startdate : String,
                /* 竣工日期*/
                completiondate : String,
                /* 修建类别*/
                buildcategory : String,
                /* 修建原因*/
                constructionreasons : String,
                /* 工程范围*/
                engineeringscope : String,
                /* 工程费用*/
                engineeringcosts : String,
                /* 经费来源*/
                sourcefunding : String,
                /* 质量评定*/
                qualityassessment : String,
                /* 建设单位*/
                constructionunit : String,
                /* 设计单位*/
                designunit : String,
                /* 施工单位*/
                builder : String,
                /* 监理单位*/
                supervisionunit : String
            }
        ],

        /* 备注*/
        memo : String,
        /* 正面照*/
        frontphoto : String,
        /* 立面照*/
        sidephoto : String,

        /* 主管负责人*/
        personincharge : String,
        /* 填卡人*/
        fillcardpeople : String,
        /* 填卡日期*/
        filldate : Date


    } );

bridgeSchema.plugin( mongoosePaginate );

var   Bridge = mongoose.model( 'Bridge', bridgeSchema );

module.exports = Bridge;

