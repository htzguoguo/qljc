/**
 * Created by Administrator on 2017/6/14.
 */

var ModelView = require( '../../../utils/modelview' ),
    BackboneValidation = require( 'backbone-validation' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/bridgeForm_superstructure_item.html', 'utf8' ),
    EmailListItem;

EmailListItem = module.exports = ModelView.extend( {
    template : template,
    tagName : 'tr',
    initialize : function () {
        ModelView.prototype.initialize.call( this );
        BackboneValidation.bind( this );
    },
    events : {
        'keyup input' : 'inputChanged',
        'change input' : 'inputChanged',
        'click a' : 'deleteItem'
    },
    inputChanged : function ( event ) {
        var $target = $( event.target ),
            value = $target.val(),
            id = $target.attr( 'id' );
        this.model.set( id, value, { validate : true } );
    },
    getInput : function ( selector ) {
        return this.$el.find( selector ).val();
    },
    deleteItem : function ( event ) {
        event.preventDefault();
        this.trigger( 'superstructure:deleted', this.model );
    }
} );