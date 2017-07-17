/**
 * Created by Administrator on 2017/6/6.
 */

var Layout = require( '../../../utils/layout' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/contactformlayout.html', 'utf8' ),
    ContactFormLayout;

ContactFormLayout = module.exports = Layout.extend( {
    template : template,
    regions : {
        preview : '#preview-container',
        form : '#form-container'
    },
    className : 'row page-container'
} );