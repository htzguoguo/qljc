/**
 * Created by Administrator on 2017/7/26.
 */

var
    Task = require( './schema/task' ),
    helper = require( './mongodb_helper' ),
    crispy = require( 'crispy-string' ),
    ID_LENGTH = 20,
    Fields =  helper.getFields( Task );

module.exports.query_by_arg = function ( arg, value, res ) {
    helper.query_by_arg( Task, arg, value, res );
};

module.exports.query = function ( number, res ) {
    helper.query( Task, 'taskname', number, res );
};

module.exports.list = function ( res ) {
    "use strict";
    helper.list( Task, 'createtime', res );
};

module.exports.paginate = function ( req, res ) {
    helper.paginate( Task, req, res );
};

module.exports.update = function ( task, res ) {
    "use strict";
    helper.update( Task, Fields, task,  'taskname', task.taskname, helper.toNewSchema, helper.toExistSchema, res );

};

module.exports.remove = function ( name, res ) {
    "use strict";
    helper.remove( Task, 'taskname', name, res  );
};



