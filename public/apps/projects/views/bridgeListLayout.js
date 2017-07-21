/**
 * Created by Administrator on 2017/7/21.
 */

var Layout = require( '../../../utils/layout' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/bridgeListLayout.html', 'utf8' ),
    ProjectListLayout;

ProjectListLayout = module.exports = Layout.extend( {
    template : template,
    className : 'row page-container',
    regions : {
        projectslist : '.project-container',
        bridgelist : '.bridge-container'
    }
} );
