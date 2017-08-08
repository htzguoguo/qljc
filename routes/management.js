/**
 * Created by Administrator on 2017/8/7.
 */

var RouterBuilder = require( '../modules/route_helper' ),
    Management = require( '../modules/management_mongodb' );

module.exports = RouterBuilder( Management );