/**
 * Created by Administrator on 2017/7/27.
 */


var ModelView = require( '../../../utils/modelview' ),
    fs = require( 'fs' ),
    BackboneValidation = require( 'backbone-validation' ),
    template = fs.readFileSync( __dirname + '/templates/taskForm.html', 'utf8' ),
    View;

View = module.exports = ModelView.extend( {
    className : 'col-xs-12',
    template : template,
    events : {
        'click .save' : 'saveTask',
        'click .cancel' : 'cancel',
        'keyup input[type=text]' : 'inputChanged',
        'change input[type=text]' : 'inputChanged',
        'keyup select' : 'inputChanged',
        'change select' : 'inputChanged',
        'click .project-list' : 'toProject',
        'click .bridge-list' : 'toBridge',
        'click .bridges-selectall' : 'selectAll',
        'click .bridges-unselect' : 'unselectAll'
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
        $(".control-primary").uniform({
            radioClass: 'choice',
            wrapperClass: 'border-primary-600 text-primary-800'
        });
        this.$el.find( '.pickadate' ).datepicker();
        BackboneValidation.bind( this );
    },
    selectAll : function () {
        this.$( '.bridges-select span' ).addClass( 'checked' );
    },
    unselectAll : function () {
        this.$( '.bridges-select span' ).removeClass( 'checked' );
    },
    saveTask : function ( event ) {
        event.preventDefault();
        var bridges = [], name, unit, id;
        $.each( this.$( '.bridges-select span.checked input:first-child' ), function ( index, element ) {
            name = $( element ).data( 'value' );
            unit = $( element ).data( 'unit' );
            id = $( element ).data( 'index' );
            bridges.push( {
                id : id,
                bridgename : name,
                custodyunit : unit
            } );
        } );
        this.model.set( 'bridges', bridges );
        this.trigger( 'form:save', this.model );
    },
    cancel : function () {
        this.trigger( 'form:cancel', this.model );
    }
} );