/**
 * Created by Administrator on 2017/7/26.
 */

var Backbone = require( 'backbone' ),
    Task = require( '../models/task' ),
    Tasks;


Tasks = module.exports = Backbone.Collection.extend( {
    url : 'api/v1/tasks',
    model : Task
} );