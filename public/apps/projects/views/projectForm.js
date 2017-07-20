/**
 * Created by Administrator on 2017/7/19.
 */

var ModelView = require( '../../../utils/modelview' ),
    _ = require( 'underscore' ),
    BackboneValidation = require( 'backbone-validation' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/projectForm.html', 'utf8' ),
    ContactForm;

ContactForm = module.exports = ModelView.extend( {
    template : template,
    className : 'panel panel-white',
    events : {
        'click #save' : 'saveContact',
        'click #cancel' : 'cancel',
        'keyup input' : 'inputChanged',
        'change input' : 'inputChanged'
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
       if ( ! this.model.isNew() ) {
            this.$( '.project-title' ).html( '编辑检测项目' );
           this.$("#projectname").prop("readonly", true);
           this.$("#projectnumber").prop("readonly", true);
       }
        this.$el.find( '#createtime' ).pickadate({
            format: 'yyyy/mm/dd',
            formatSubmit: 'yyyy/mm/dd'
        });
        BackboneValidation.bind( this );
    },
    saveContact : function ( event ) {
        event.preventDefault();
        this.trigger( 'form:save', this.model );
    },
    cancel : function () {
        this.trigger( 'form:cancel', this.model );
    }
} );
