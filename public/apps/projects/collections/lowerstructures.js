/**
 * Created by Administrator on 2017/7/25.
 */
var Backbone = require( 'backbone' ),
    Model = require( '../models/lowerstructure' ),
    Collection;

Collection = module.exports = Backbone.Collection.extend( {
    model : Model
} );