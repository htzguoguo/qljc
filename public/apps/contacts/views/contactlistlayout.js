/**
 * Created by Administrator on 2017/6/1.
 */

var Layout = require( '../../../utils/layout' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/contactlist.html', 'utf8' ),
    ContactListLayout;

ContactListLayout = module.exports = Layout.extend( {
    template : template,
    className : 'row page-container',
    regions : {
        actions : '.actions-bar-container',
        list : '.list-container'
    }
} );


