/**
 * Created by Administrator on 2017/8/7.
 */

var Backbone = require( 'backbone' ),
    Management = require( '../models/management' ),
    Managements;


Managements = module.exports = Backbone.Collection.extend( {
    url : 'api/v1/managements',
    model : Management
} );