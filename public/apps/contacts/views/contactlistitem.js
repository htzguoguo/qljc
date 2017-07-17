/**
 * Created by Administrator on 2017/5/21.
 */

var ModelView = require( '../../../utils/modelview' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/contact.html', 'utf8' ),
    ContactView;

ContactView = module.exports = ModelView.extend( {
    template : template,
    className : 'col-xs-12 col-sm-6 col-md-3',
    events : {
        'click #delete' : 'deleteContact',
        'click #view' : 'viewContact'
    },
    deleteContact : function () {
        "use strict";
        this.trigger( 'contact:delete', this.model );
    },
    viewContact : function () {
        var contactId = this.model.get('primarycontactnumber');
        window.app.router.navigate(`contacts/view/${contactId}`, true);
    }
} );


