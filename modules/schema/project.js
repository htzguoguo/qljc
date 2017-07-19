/**
 * Created by Administrator on 2017/7/19.
 */

var mongoose = require( 'mongoose' ),
    mongoosePaginate = require( 'mongoose-paginate' ),
    projectSchema = new mongoose.Schema( {
        projectname : {
            type : String,
            index : {
                unique : true
            }
        },
        projectnumber : {
            type : String,
            index : {
                unique : true
            }
        },
        roadgrade : String,
        functiontype : String,
        shejihezai : String,
        manageunit : String,
        creater : String,
        createtime : Date,
        status : String,
        memo : String
    } );

projectSchema.plugin( mongoosePaginate );

var   Project = mongoose.model( 'Project', projectSchema );

module.exports = Project;
