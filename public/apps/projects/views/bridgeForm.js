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
        lowerstructures : '.lowerstructure_list',
        tech : '.tech_list',
        eng : '.eng_list'
    },
    events : {
        'click .save' : 'saveContact',
        'click .cancel' : 'cancel',
        'keyup input' : 'inputChanged',
        'change input' : 'inputChanged',
        'click .add-superstructure' : 'addSuperstructure',
        'click .add-lowerstructure' : 'addLowerstructure',
        'click .add-tech' : 'addTech',
        'click .add-eng' : 'addEng',
        'click img' : 'showSelectFileDialog',
        'change .upload-frontphoto-file' : 'fileSelected',
        'change .upload-sidephoto-file' : 'fileSelected'
    },
    showSelectFileDialog : function ( event ) {
        $( event.target ).parent().find( 'input' ).click();
    },
    fileSelected : function ( event ) {
        event.preventDefault();
        var $fileInput = this.$( event.target )[0],
            $img = this.$( event.target ).parent().find( 'img' ),
            imgCategory = this.$( event.target ).data( 'index' ),
            fileBlob = $fileInput.files[ 0 ],
            fileReader = new FileReader(),
            app = this;
        fileReader.onload = function ( event ) {
            $img.attr( 'src', event.target.result );
        };
        fileReader.readAsDataURL( fileBlob );
        this.trigger( 'upload:' + imgCategory + ':selected', fileBlob );
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
    addLowerstructure : function () {
        this.trigger( 'lowerstructure:add' );
    },
    addTech : function () {
        this.trigger( 'tech:add' );
    },
    addEng : function () {
        this.trigger( 'eng:add' );
    }

} );
