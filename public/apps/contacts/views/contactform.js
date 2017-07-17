/**
 * Created by Administrator on 2017/6/6.
 */

var Layout = require( '../../../utils/layout' ),
    _ = require( 'underscore' ),
    BackboneValidation = require( 'backbone-validation' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/contactform.html', 'utf8' ),
    //template = require( './templates/contactform.html' ),
    ContactForm;

ContactForm = module.exports = Layout.extend( {
    template : template,
    className : 'form-horizontal',
    regions : {
        phones : '.phone-list-container',
        emails : '.email-list-container'
    },
    initialize : function () {
       // this.listenTo( this.model, 'invalid', this.showError  );
    },
    events : {
        'click #save' : 'saveContact',
        'click #cancel' : 'cancel',
        'keyup input' : 'inputChanged',
        'change input' : 'inputChanged',
        'click #new-phone' : 'addPhone',
        'click #new-email' : 'addEmail'
    },
    serializeData : function () {
        return _.defaults( this.model.toJSON(), {
            title : '',
            company : '',
            othercontactnumbers : '',
            primaryemailaddress : '',
            birthdate : ''
        } );
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
    addPhone : function () {
        this.trigger( 'phone:add' );
    },
    addEmail : function () {
        this.trigger( 'email:add' );
    },
    showError : function ( model, error ) {
        this.clearErrors();
        var selector =  '#' + error.attr ;
        var $msg = $( '<span>' )
            .addClass( 'error')
            .addClass( 'help-block' )
            .html( error.message );
        this.$( selector )
            .closest( '.form-group' )
            .addClass( 'has-error' );
        this.$( selector )
            .after( $msg );

    },
    clearErrors : function () {
        this.$( '.has-error' ).removeClass( 'has-error' );
        this.$( 'span.error' ).remove();
    }
} );