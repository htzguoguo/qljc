/**
 * Created by Administrator on 2017/6/2.
 */

var Layout = require( '../../../utils/layout' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/contactviewlayout.html', 'utf8' ),
    ContactViewLayout;

ContactViewLayout = module.exports = Layout.extend( {
    template : template,
    regions : {
        widget : '#contact-widget',
        about : '#about-container',
        calls : '#call-log-container'
    },
    className : 'row page-container'
} );
