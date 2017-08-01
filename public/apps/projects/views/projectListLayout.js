/**
 * Created by Administrator on 2017/6/1.
 */

var Layout = require( '../../../utils/layout' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/projectListLayout.html', 'utf8' ),
    ProjectListLayout;

ProjectListLayout = module.exports = Layout.extend( {
    template : template,

    regions : {
        actions : '.actions-bar-container',
        list : '.list-container'
    }
} );


