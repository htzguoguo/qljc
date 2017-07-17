/**
 * Created by Administrator on 2017/6/2.
 */

var ModelView = require( '../../../utils/modelview' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/contactviewwidget.html', 'utf8' ),
    ContactViewWidget;

ContactViewWidget = module.exports = ModelView.extend( {
    template : template,
    className : 'box contact-summary'
} );
