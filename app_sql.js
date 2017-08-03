require('./modules/mongodb');
var Connection = require('tedious').Connection;
var Helper = require( './modules/mongodb_helper' );
var Bridge = require( './modules/schema/bridge' );
var Path = require( 'path' );
var fs = require( 'fs' );
var rows = [];

//用户名，密码和数据库服务器,数据库  
var config = {
    userName: 'sa',
    password: 'sa',
    server: '127.0.0.1',
    options : {
        database  : 'BridgeDisease'
    }
};

var connection = new Connection(config);
var Request = require('tedious').Request;

connection.on('connect', function(err) {
    //错误处理  
    if(err)
    {
        console.log("连接出错!");
    }
    else {
        {
            console.log("连接成功!");
        }
    }
   // getBasicData();
    //getJSPDData();
    //getXJGCJLData();
    //getOthersData();
    getPicData();
});

function getBasicData()
{
    var bridge;
    request = new Request("SELECT * FROM Bridge81BasicInfo", function(err, rowCount)
    {
        if (err)
        {
        }
        else
        {
            rows.forEach(function(r){
                bridge = toNewBridge_BasicInfo(r);
                saveBridge( bridge );
                 console.log( bridge.bridgename  + 'saved.' );
            })
        }
    });

    request.on('row', function(columns)
    {
        var row = {};
        columns.forEach(function(column)
        {
            row[column.metadata.colName] = column.value;
        });
        rows.push(row);

    });
    connection.execSql(request);
}

function getJSPDData()
{
    request = new Request("SELECT * FROM Bridge81JishuPingdingInfo", function (err, rowCount) {
        console.log( "Bridge81JishuPingdingInfo" );
        rows.forEach(function( row ) {
            console.log(row["桥梁名称"]);
            Bridge.findOne({bridgename: row["桥梁名称"]}, function (error, data) {
                data.technicalstatusassessment = [
                    {
                        checkdate: row["检查年月"],
                        regularspecialinspection: row["定期或特殊检查"],
                        bridgerating: row["全桥评定等级"],
                        abutmentfoundation: row["桥台与基础"],
                        pierfoundation: row["桥墩与基础"],
                        foundationerosion: row["地基冲刷"],
                        superstructure: row["上部结构"],
                        bearing: row["支座"],
                        maintenanceminorrepair: row["经常保养小修"],
                        treatmentmeasures: row["处治对策"],
                        nextcheckyears: row["下次检查年份"]
                    }
                ];
                data.save(function (error) {
                    if (!error) {
                        data.save();
                    }
                });
            });
        });
    });
    request.on('row', function(columns)
    {
        var row = {};
        columns.forEach(function(column)
        {
            row[column.metadata.colName] = column.value;
        });
        rows.push(row);

    });
    connection.execSql(request);
}

function getXJGCJLData()
{
    request = new Request("SELECT * FROM Bridge81XiujianInfo1", function (err, rowCount) {
        console.log( "Bridge81JishuPingdingInfo" );
        rows.forEach(function( row ) {
            console.log(row["桥梁名称"]);
            Bridge.findOne({bridgename: row["桥梁名称"]}, function (error, data) {
                data.engineeringrecords = [
                    {
                        startdate: row["开工"],
                        completiondate: row["竣工"],
                        buildcategory: row["修建类别"],
                        constructionreasons: row["修建原因"],
                        engineeringscope: row["工程范围"],
                        engineeringcosts: row["工程费用"],
                        sourcefunding: row["经费来源"],
                        qualityassessment: row["质量评定"],
                        constructionunit: row["建设单位"],
                        designunit: row["设计单位"],
                        builder: row["施工单位"],
                        supervisionunit: row["监理单位"]
                    }
                ];

                data.save(function (error) {
                    if (!error) {
                        data.save();
                    }
                });
            });
        });
    });
    request.on('row', function(columns)
    {
        var row = {};
        columns.forEach(function(column)
        {
            row[column.metadata.colName] = column.value;
        });
        rows.push(row);

    });
    connection.execSql(request);
}

function getOthersData()
{
    request = new Request("SELECT * FROM Bridge81XiujianInfo2", function (err, rowCount) {
        console.log( "Bridge81JishuPingdingInfo" );
        rows.forEach(function( row ) {
            console.log(row["桥梁名称"]);
            Bridge.findOne({bridgename: row["桥梁名称"]}, function (error, data) {
                data.memo = row["备注"];
                data.personincharge = row["主管负责人"];
                data.fillcardpeople = row["填卡人"];
                data.filldate = row["填卡日期"];
                data.save(function (error) {
                    if (!error) {
                        data.save();
                    }
                });
            });
        });
    });
    request.on('row', function(columns)
    {
        var row = {};
        columns.forEach(function(column)
        {
            row[column.metadata.colName] = column.value;
        });
        rows.push(row);

    });
    connection.execSql(request);
}

function getPicData() {
    var picPath = Path.join( __dirname + '/照片' ), frontFile, sideFile;
    fs.readdir(picPath, function(err, files) {
        if (err) return;
        files.forEach(function (f) {
            frontFile = Helper.makeId();
            sideFile = Helper.makeId();
            fs.createReadStream('./照片/' + f + '/正面照.jpg').pipe(fs.createWriteStream( './upload/' + frontFile + '.jpg'  ));
            fs.createReadStream('./照片/' + f + '/立面照.jpg').pipe(fs.createWriteStream( './upload/' + sideFile + '.jpg'  ));
            Bridge.findOne({bridgename: f }, function (error, data) {
                if ( data ) {
                    data.frontphoto = 'files/' + frontFile + '.jpg';
                    data.sidephoto = 'files/' + sideFile + '.jpg';
                    data.save(function (error) {
                        if (!error) {
                            data.save();
                        }
                    });
                }
            });
            console.log( f , 'done' );
        });
    });
}



function  saveBridge( bridge ) {
    "use strict";
    var newbridge;
    Bridge.findOne( { bridgenumber : bridge.bridgenumber }, function ( error, data ) {
        if ( error ) {

        }else {
            newbridge = bridge;
            if ( !data ) {
                newbridge.save( function ( error ) {
                    if ( ! error ) {
                        newbridge.save();
                    }
                } );
            }else {
                toExistBridge_BasicInfo( data, newbridge );
                data.save( function ( error ) {
                    if ( ! error ) {
                        data.save();
                    }
                } );
            }
        }
    } );
}

function toExistBridge_BasicInfo( data, newbridge ) {
        data.bridgename = newbridge.bridgename;
        data.centerstation= newbridge.centerstation;
        data.routename= newbridge.routename;
        data.routenumber= newbridge.routenumber;
        data.routelevel= newbridge.routelevel;
        data.functiontype= newbridge.functiontype;

        data.underchannelname= newbridge.underchannelname;
        data.underchannelcenterstation= newbridge.underchannelcenterstation;
        data.designload= newbridge.designload;
        data.trafficload= newbridge.trafficload;
        data.skewslope= newbridge.skewslope;
        data.deckpavement= newbridge.deckpavement;
        data.custodyunit= newbridge.custodyunit;
        data.buildyear= newbridge.buildyear;

        data.bridgelength= newbridge.bridgelength;
        data.bridgewidth= newbridge.bridgewidth;
        data.drivewaywidth= newbridge.drivewaywidth;
        data.bridgeelevation= newbridge.bridgeelevation;
        data.undernetheight= newbridge.undernetheight;
        data.abovenetheight= newbridge.abovenetheight;
        data.approachwidth= newbridge.approachwidth;
        data.approachroadwide= newbridge.approachroadwide;
        data.leadline= newbridge.leadline;

        data.expansionjointtype= newbridge.expansionjointtype;
        data.bearingform= newbridge.bearingform;
        data.groundmotion= newbridge.groundmotion;
        data.abutmentslope= newbridge.abutmentslope;
        data.protectpier= newbridge.protectpier;
        data.conditioningstructure= newbridge.conditioningstructure;
        data.oftenwaterlevel= newbridge.oftenwaterlevel;
        data.designwaterlevel= newbridge.designwaterlevel;
        data.historicalfloodlevel= newbridge.historicalfloodlevel;
        data.designdrawings= newbridge.designdrawings;
        data.designingdocuments= newbridge.designingdocuments;
        data.constructiondocuments= newbridge.constructiondocuments;

        data.finisheddrawings= newbridge.finisheddrawings;
        data.acceptancedocuments= newbridge.acceptancedocuments;
        data.administrativedocuments= newbridge.administrativedocuments;
        data.periodicalcheckreport= newbridge.periodicalcheckreport;
        data.specialinspectionreport= newbridge.specialinspectionreport;
        data.previousmaintenanceinformation= newbridge.previousmaintenanceinformation;

        data.filenumber= newbridge.filenumber;
        data.archive= newbridge.archive;
        data.filetime= newbridge.filetime;
}

function toNewBridge_BasicInfo( row ) {
    return new Bridge(
        {
            bridgename : row["桥梁名称"],
            bridgenumber: row["桥梁编号"],
            centerstation: row["桥位中心桩号"],
            routename: row["路线名称"],
            routenumber: row["路线编号"],
            routelevel: row["路线等级"],
            functiontype: row["功能类型"],

            underchannelname: row["下穿通道名"],
            underchannelcenterstation: row["下穿通道中心"],
            designload: row["设计荷载"],
            trafficload: row["通行载重"],
            skewslope: row["弯斜坡度"],
            deckpavement: row["桥面铺装"],
            custodyunit: row["管养单位"],
            buildyear: row["建成年限/设计使用年限"],

            bridgelength: row["桥长"],
            bridgewidth: row["桥面总宽"],
            drivewaywidth: row["车行道宽"],
            bridgeelevation: row["桥面标高"],
            undernetheight: row["桥下净高"],
            abovenetheight: row["桥上净高"],
            approachwidth: row["引道总宽"],
            approachroadwide: row["引道路面宽"],
            leadline: row["引道线形"],

            expansionjointtype: row["伸缩缝类型"],
            bearingform: row["支座形式"],
            groundmotion: row["地震动峰值加速度系数"],
            abutmentslope: row["桥台护坡"],
            protectpier: row["护墩体"],
            conditioningstructure: row["调治构造物"],
            oftenwaterlevel: row["常水位"],
            designwaterlevel: row["设计水位"],
            historicalfloodlevel: row["历史洪水位"],
            designdrawings: row["设计图纸"],
            designingdocuments: row["设计文件"],
            constructiondocuments: row["施工文件"],

            finisheddrawings: row["竣工图纸"],
            acceptancedocuments: row["验收文件"],
            administrativedocuments: row["行政文件"],
            periodicalcheckreport: row["定期检查报告"],
            specialinspectionreport: row["特殊检查报告"],
            previousmaintenanceinformation: row["历次维修资料"],

            filenumber: row["档案号"],
            archive: row["存档案"],
            filetime: row["建档时间"]

        });
}

/*Bridge.findOne( { bridgename : "西台路通道桥" }, function ( error, data ) {
    console.log( data );
} );*/


