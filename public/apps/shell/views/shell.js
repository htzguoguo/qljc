/**
 * Created by Administrator on 2017/5/24.
 */

var Layout = require( '../../../utils/layout' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/shell.html', 'utf8' ),
    ShellView;

ShellView = module.exports = Layout.extend( {
     template : template,
     regions : {
        menu : '.tjx-top-first-menu',
        main : '.content-wrapper',
        footer : '.tjx-bottom-booter',
        rightmodal : '#todo-task-modal'
    }
} );

