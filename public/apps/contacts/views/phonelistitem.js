/**
 * Created by Administrator on 2017/6/14.
 */

var ModelView = require( '../../../utils/modelview' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/contactformphoneitem.html', 'utf8' ),
    PhoneListItem;

PhoneListItem = module.exports = ModelView.extend( {
    template : template,
    className : 'form-group',
    events : {
        'change .description' : 'updateDescription',
        'change .phone' : 'updatePhone',
        'click a' : 'deletePhone'
    },
    updateDescription : function () {
        var $description = this.$( '.description' );
        this.model.set( 'description', $description.val() );
    },
    updatePhone : function () {
        var $phone = this.$( '.phone' );
        this.model.set( 'phone', $phone.val() );
    },
    deletePhone : function ( event ) {
        event.preventDefault();
        this.trigger( 'phone:deleted', this.model );
    }
} );
