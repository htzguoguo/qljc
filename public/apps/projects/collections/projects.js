/**
 * Created by Administrator on 2017/7/18.
 */
var Backbone = require( 'backbone' ),
    Project = require( '../models/project' ),
    Projects;

Projects = module.exports = Backbone.Collection.extend( {
    url : 'api/v1/projects',
    model : Project
} );