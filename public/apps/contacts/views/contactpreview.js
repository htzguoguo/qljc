/**
 * Created by Administrator on 2017/6/6.
 */

var ModelView = require( '../../../utils/modelview' ),
    _ = require( 'underscore' ),
    fs = require( 'fs' ),
    StickIt = require( 'backbone.stickit' ),
    template = fs.readFileSync( __dirname + '/templates/contactpreview.html', 'utf8' ),
    ContactPreview;

ContactPreview = module.exports = ModelView.extend( {
    template : template,
    onShow : function () {
       this.stickit();
   },
    initialize : function ( options ) {
       this.model.on( 'change', this.render, this );
       if ( options.controller ) {
           this.listenTo( options.controller , 'avatar:uploading:start',
               this.uploadingAvatarStart, this
           );
           this.listenTo( options.controller, 'avatar:uploading:done',
                this.uploadingAvatarDone, this);
           this.listenTo( options.controller, 'avatar:uploading:error',
                this.uploadingAvatarError, this);
       }
    },
    uploadingAvatarStart : function () {
        this.originalAvatarMessage = this.$( 'span.notice' ).html();
        this.$( 'span.notice' ).html( 'uploading avatar...' );

    },
    uploadingAvatarDone : function () {
        this.$( 'span.notice' ).html( this.originalAvatarMessage || '' );
    },
    uploadingAvatarError : function () {
        this.$( 'span.notice' ).html( 'can not upload image, try again later' );
    },
    bindings : {
        '#name' : 'name',
        '#phone' : 'phone',
        '#email' : 'email'
    },
    events : {
        'click img' : 'showSelectFileDialog',
        'change #avatar' : 'fileSelected'
    },
    showSelectFileDialog : function () {
        this.$( '#avatar' ).click();
    },
    fileSelected : function ( event ) {
        event.preventDefault();
        var $fileInput = this.$( '#avatar' )[0],
            $img = this.$( 'img' ),
            fileBlob = $fileInput.files[ 0 ],

            fileReader = new FileReader(),
            app = this;
        fileReader.onload = function ( event ) {
            $img.attr( 'src', event.target.result );
            if ( app.model.isNew() ) {
                app.model.set( {
                    avatar : {
                        url : event.target.result
                    }
                } );
            }
        };
        fileReader.readAsDataURL( fileBlob );
        this.trigger( 'avatar:selected', fileBlob );
    }
} );

