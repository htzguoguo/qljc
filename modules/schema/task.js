/**
 * Created by Administrator on 2017/7/26.
 */

var mongoose = require( 'mongoose' ),
    mongoosePaginate = require( 'mongoose-paginate' ),
    taskSchema = new mongoose.Schema( {
        taskname : {
            type : String,
            index : {
                unique : true
            }
        },
        tasknumber : {
            type : String,
            index : {
                unique : true
            }
        },
        routename : String,
        routenumber : String,
        detectiontype : String,
        creator : String,
        createtime : Date,
        bridges : [
            {
                id : String,
                bridgename : String,
                bridgenumber : String
            }
        ],
        status : String,
        memo : String
    } );

taskSchema.plugin( mongoosePaginate );

var   Task = mongoose.model( 'Task', taskSchema );

module.exports = Task;
