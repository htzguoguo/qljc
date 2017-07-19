var Connection = require('tedious').Connection;
var mongoose = require('mongoose');
var rows = [];

//用户名，密码和数据库服务器,数据库  
var config = {
    userName: 'sa',
    password: 'sa',
    server: '127.0.0.1',
    options : {
        database  : 'TJX_APP_SZWG_RoadInspectCaseDatabase2015_20150105'
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
        };
    }
    getSqlData();
});

function getSqlData()
{
    console.log('从SQL获取数据');
    request = new Request("SELECT * FROM CaseBasicInfos", function(err, rowCount)
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            console.log("行数: " + rowCount);
            //遍历对象数组，查出数据  
            // rows.forEach(function(r){    
            // console.log(r["name"]+"---"+r["code"]);  
            // })    
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