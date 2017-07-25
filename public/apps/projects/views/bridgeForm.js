/**
 * Created by Administrator on 2017/7/24.
 */

/**
 * Created by Administrator on 2017/6/6.
 */

var  Layout = require( '../../../utils/layout' ),
    _ = require( 'underscore' ),
    BackboneValidation = require( 'backbone-validation' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/bridgeForm_tab.html', 'utf8' ),
    BridgeForm;

BridgeForm = module.exports = Layout.extend( {
    template : template,
    className : 'panel panel-white',
    regions : {
        superstructures : '.superstructure_list',
        emails : '.email-list-container'
    },
    events : {
        'click .save' : 'saveContact',
        'click .cancel' : 'cancel',
        'keyup input' : 'inputChanged',
        'change input' : 'inputChanged',
        'click .add-superstructure' : 'addSuperstructure',
        'click #new-email' : 'addEmail'
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
        this.$el.find( '#birthdate' ).datepicker();
        BackboneValidation.bind( this );
    },
    saveContact : function ( event ) {
        event.preventDefault();
        this.trigger( 'form:save', this.model );
    },
    cancel : function () {
        this.trigger( 'form:cancel', this.model );
    },
    addSuperstructure : function () {
        this.trigger( 'superstructure:add' );
    },
    addEmail : function () {
        this.trigger( 'email:add' );
    }

} );
