/**
 * Created by Administrator on 2017/7/19.
 */

var ModelView = require( '../../../utils/modelview' ),
    Mustache = require( 'mustache' ),
    _ = require( 'underscore' ),
    BackboneValidation = require( 'backbone-validation' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/projectForm.html', 'utf8' ),
    template_bridges = fs.readFileSync( __dirname + '/templates/projectForm_bridges.html', 'utf8' ),
    template_selectedBridges = fs.readFileSync( __dirname + '/templates/projectForm_selectedBridges.html', 'utf8' ),
    ContactForm;

ContactForm = module.exports = ModelView.extend( {
    template : template,
    className : 'col-xs-12',

    events : {
        'click .save' : 'saveContact',
        'click .cancel' : 'cancel',
        'keyup input[type=text]' : 'inputChanged',
        'change input[type=text]' : 'inputChanged',
        'change input[type=checkbox]' : 'checkboxChanged',
        'click .bridges-selectall' : 'selectAll',
        'click .bridges-unselect' : 'unselectAll',
        'change #units' : 'renderBridges'
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
    checkboxChanged : function ( event ) {

        var $target = $( event.target ),
            name = $target.data( 'value' ),
            unit = $target.data( 'unit' ),
            id = $target.data( 'index' );
        var bridge = {
            id : id,
            bridgename : name,
            custodyunit : unit
        };

        if ( $target.prop( 'checked' ) ) {
            this.model.addDefaultBridges(  [ bridge ]  );
            this.renderSelectedBridges();
            this.model.selectBridges( this.$( '#units' ).val(), [ bridge ] );
        }else {
            this.model.removeDefaultBridges( [ bridge ]  );
            this.renderSelectedBridges();
            this.model.unselectBridges( this.$( '#units' ).val(), [ bridge ] );
        }
    },
    selectAll : function () {
        this.$( '.bridges-select span' ).addClass( 'checked' );
        this.model.addDefaultBridges( this.model.brs[ this.$( '#units' ).val() ]  );
        this.renderSelectedBridges();
        this.model.selectBridges( this.$( '#units' ).val(), this.model.brs[ this.$( '#units' ).val() ] );
    },
    unselectAll : function () {
        this.$( '.bridges-select span' ).removeClass( 'checked' );
        this.model.removeDefaultBridges( this.model.brs[ this.$( '#units' ).val() ]  );
        this.renderSelectedBridges();
        this.model.unselectBridges( this.$( '#units' ).val(), this.model.brs[ this.$( '#units' ).val() ] );
    },
    renderBridges : function () {
        this.$( '.bridges-select' ).html( Mustache.to_html( template_bridges,
            { dbridges :  this.model.brs[ this.$( '#units' ).val() ]  }  ) );
        $(".control-primary").uniform({
            radioClass: 'choice',
            wrapperClass: 'border-primary-600 text-primary-800'
        });

    },
    renderSelectedBridges : function () {

        this.$( '.bridges-selected' ).html( Mustache.to_html( template_selectedBridges,
            { bridges :  this.model.bridges  }  ) );
    },
    onShow : function () {
        this.renderBridges();
        this.renderSelectedBridges();
        $(".control-primary").uniform({
            radioClass: 'choice',
            wrapperClass: 'border-primary-600 text-primary-800'
        });

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
        this.model.set( 'bridges', this.model.bridges );
        this.trigger( 'form:save', this.model );
    },
    cancel : function () {
        this.trigger( 'form:cancel', this.model );
    }
} );
