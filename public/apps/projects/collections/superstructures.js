/**
 * Created by Administrator on 2017/7/24.
 */

var Backbone = require( 'backbone' ),
    Model = require( '../models/superstructure' ),
    Collection;

Collection = module.exports = Backbone.Collection.extend( {
    model : Model
} );
