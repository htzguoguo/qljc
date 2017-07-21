/**
 * Created by Administrator on 2017/7/21.
 */

var Backbone = require( 'backbone' ),
    Bridge = require( '../models/bridge' ),
    Bridges;

Bridges = module.exports = Backbone.Collection.extend( {
    url : 'api/v1/bridges',
    model : Bridge
} );
