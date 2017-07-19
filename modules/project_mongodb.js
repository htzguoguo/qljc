/**
 * Created by Administrator on 2017/7/19.
 */

var
    Project = require( './schema/project' ),
    helper = require( './http_helper' ),
    crispy = require( 'crispy-string' ),
    ID_LENGTH = 20;

/*var db = mongoose.createConnection( 'mongodb://localhost/projects', { useMongoClient: true } );*/

module.exports.query_by_arg = function ( arg, value, res ) {
    "use strict";
    var filter = {};
    if ( arg instanceof Array ) {
        arg.forEach( function ( a, index ) {
            filter[ a ] = value[ index ];
        })
    }else {
        filter[ arg ] = value;
    }
    Project.find( filter, function ( error, data ) {
        if ( error ) {
            helper.InternalServerError( res, error, { arg : arg, value : value } );
        }else {
            if ( ! data ) {
                helper.ResourceNotFound( res, { arg : arg, value : value } );
            }else {
                helper.ResourceFound( res, data );
            }
        }
    });
};

module.exports.list = function ( res ) {
    "use strict";
    Project.find( {}, function ( error, data ) {
        if ( error ) {
            helper.InternalServerError( res );
        }else {
            helper.ResourceFound( res, data );
        }
    } ).sort({'createtime': -1});
};

module.exports.paginate = function ( req, res ) {
    console.log( 'paginate' );
    Project.paginate( {}
        ,{ page : req.query.page, limit : req.query.limit }
        , function ( error, data ) {
            if ( error ) {
                helper.InternalServerError( res );
            }else {
                helper.ResourceFound( res, {
                    object : 'contacts',
                    items_count : data.total,
                    page_count : data.pages,
                    item_count : data.limit,
                    page_index : data.page,
                    result : data.docs
                } );
            }
        }
    );
};

module.exports.update = function ( project, res ) {
    "use strict";
    var newproject;
    Project.findOne( { projectname : project.projectname }, function ( error, data ) {
        if ( error ) {
            helper.InternalServerError( res, error, { projectname :  project.projectname } );
        }else {
            newproject = toNewProject( project );
            if ( !data ) {
                newproject.save( function ( error ) {
                    if ( ! error ) {
                        newproject.save();
                    }
                } );
                helper.ResourceCreated( res, newproject );
            }else {
                toExistProject( data, newproject );
                data.save( function ( error ) {
                    if ( ! error ) {
                        data.save();
                    }
                    helper.ResourceUpdated(res, data );
                } );
            }
        }
    } );
};

function makeId() {
    return crispy.base32String(ID_LENGTH);
}

function toExistProject( data, project ) {
    "use strict";
    data.projectname = project.projectname;
    data.projectnumber = project.projectnumber;
    data.roadgrade = project.roadgrade;
    data.functiontype = project.functiontype;
    data.shejihezai = project.shejihezai;
    data.manageunit = project.manageunit;
    data.creater = project.creater;
    data.createtime = project.createtime;
    data.status = project.status;
    data.memo = project.memo;
}

function toNewProject( body ) {
    "use strict";

    return new Project(
        {
            projectname : body.projectname,
            projectnumber: makeId(),
            roadgrade: body.roadgrade,
            functiontype: body.functiontype,
            shejihezai: body.shejihezai,
            manageunit: body.manageunit,
            creater: body.creater,
            createtime: new Date(),
            status: '正常',
            memo: body.memo
        });
}












