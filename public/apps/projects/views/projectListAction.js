/**
 * Created by Administrator on 2017/7/18.
 */

var ModelView = require( '../../../utils/modelview' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/projectListAction.html', 'utf8' ),
    View;

View = module.exports = ModelView.extend( {
    className : 'options-bar col-xs-12',
    template : template,
    events : {
        'click .project-list' : 'toProject',
        'click .bridge-list' : 'toBridge'
    },
    toProject : function () {
        "use strict";
        window.app.router.navigate( '/projects', true );
    },
    toBridge : function () {
        "use strict";
        window.app.router.navigate( '/bridges', true );
    }
} );
