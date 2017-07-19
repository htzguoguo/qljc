/**
 * Created by Administrator on 2017/7/18.
 */

var ModelView = require( '../../../utils/modelview' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/projectListItem.html', 'utf8' ),
    ContactView;

ContactView = module.exports = ModelView.extend( {
    template : template,
    className : 'col-md-6',
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
