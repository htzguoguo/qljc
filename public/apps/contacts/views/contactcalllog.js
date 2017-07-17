/**
 * Created by Administrator on 2017/6/2.
 */

var ModelView = require( '../../../utils/modelview' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/contactcalllog.html', 'utf8' ),
    ContactCallLog;

ContactCallLog = module.exports = ModelView.extend( {
    template : template,
    className : 'panel panel-simple'
} );
