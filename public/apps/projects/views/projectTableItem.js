/**
 * Created by Administrator on 2017/7/19.
 */

var ModelView = require( '../../../utils/modelview' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/projectTableItem.html', 'utf8' ),
    View;

View = module.exports = ModelView.extend( {
    template : template,
    tag : 'tr',
    events : {
        'click #delete' : 'deleteContact',
        'click #view' : 'viewContact'
    },
    deleteContact : function () {
        "use strict";
        this.trigger( 'contact:delete', this.model );
    },
    viewContact : function () {

    }
} );
