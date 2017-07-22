/**
 * Created by Administrator on 2017/7/22.
 */

var ModelView = require( '../../../utils/modelview' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/bridgePreview.html', 'utf8' ),
    View;

View = module.exports = ModelView.extend( {
    template : template,
    className : 'panel panel-white'
} );