/**
 * Created by Administrator on 2017/8/7.
 */

var ModelView = require( '../../../utils/modelview' ),
    fs = require( 'fs' ),
    BackboneValidation = require( 'backbone-validation' ),
    template = fs.readFileSync( __dirname + '/templates/managementForm.html', 'utf8' ),
    View;

View = module.exports = ModelView.extend( {
    className : 'col-xs-12',
    template : template,
    events : {
        'click .save' : 'saveManagement',
        'click .cancel' : 'cancel',
        'keyup input[type=text]' : 'inputChanged',
        'change input[type=text]' : 'inputChanged'
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
    onShow : function () {
        if ( !this.model.isNew() ) {
            this.$( '#managementname' ).attr( 'readonly', 'readonly' );
            this.$( '#managementnumber' ).attr( 'readonly', 'readonly' );
        }
        BackboneValidation.bind( this );
    },
    saveManagement : function ( event ) {
        event.preventDefault();
        this.trigger( 'form:save', this.model );
    },
    cancel : function () {
        this.trigger( 'form:cancel', this.model );
    }
} );
