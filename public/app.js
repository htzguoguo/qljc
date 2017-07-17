/**
 * Created by Administrator on 2017/4/13.
 */

var BackBone = require( 'backbone' ),
    BackboneValidation = require( 'backbone-validation' ),
    LoginApp = require( './apps/users/app' ),
    ShellLayout = require( './apps/shell/views/shell' ),
    LoginSession = require( './apps/login/models/loginsession' ),
    Region = require( './utils/region' ),
    _ = require( 'underscore' ),
    DefaultRouter = null,
    Application = null;



Application = {
    Models : {},
    Collections :{},
    Routers : {},
    currentSubapp : undefined,
    shell : undefined,
    bodyRegion : new Region( { el : 'body' } ),
    headerRegion : new Region( { el : '#navbar-main' } ),

    // The common place where  sub-applications will be shown
    mainRegion : new Region( { el : '.content-wrapper' } ),
    footerRegion : new Region( { el : '.tjx-bottom-booter' } ),
    rightModal : new Region ( { el : '#todo-task-modal' } ),
    pubsub :  _.extend( {}, BackBone.Events ),
    startSubApplication : function ( SubApplication ) {
        "use strict";
        if ( SubApplication.prototype.constructor ===   LoginApp) {
            if ( this.shell ) {
                this.shell.destroy();
                this.shell = undefined;
            }
        }else {
            if ( ! this.shell ) {
                this.shell = new ShellLayout();
                this.bodyRegion.show( this.shell );
                this.headerRegion =  this.shell.getRegion( 'menu' );
                this.mainRegion = this.shell.getRegion( 'main' );
                this.footerRegion = this.shell.getRegion( 'footer' );
                this.rightModal = this.shell.getRegion( 'rightmodal' );
            }
        }
        if ( this.currentSubapp && this.currentSubapp instanceof  SubApplication) {
            return this.currentSubapp;
        }
        if ( this.currentSubapp && this.currentSubapp.destroy ) {
            this.currentSubapp.destroy();
        }
        this.currentSubapp = new SubApplication( { bodyRegion : this.bodyRegion ,mainRegion : this.mainRegion } );
        return this.currentSubapp;
    }
};

global.window.app =  Application;

DefaultRouter = require( './routers/approuters' );

Application.start = function () {
    "use strict";

    // Create a globle router to enable sub-applications  to redirect to other urls
    Application.router = new DefaultRouter();

    // Load authentication data
    LoginSession.initializeAuth();
    _.each(_.values(Application.Routers), function(Router) {
        new Router();
    });
    BackBone.history.start();
};



/*  _.extend( Application.prototype, {


} );*/

  _.extend( BackboneValidation.callbacks, {
      valid : function ( view, attr ) {
          var $el = view.$( '#' + attr );
          if ( $el.length === 0 ) {
              $el = view.$( '[name=' + attr + ']' );
          }
          // If input is inside an input group, $el is changed to
          // remove error properly
          if ( $el.parent().hasClass( 'input-group' ) ) {
              $el = $el.parent();
          }
          var $group = $el.closest( '.form-group' );
          $group.removeClass( 'has-error' )
              .addClass( 'has-success' );
          var $helpBlock = $el.next( '.help-block' );
          if ( $helpBlock.length === 0 ) {
              $helpBlock = $el.children( '.help-block' );
          }
          $helpBlock.slideUp( {
              done : function () {
                  $helpBlock.remove();
              }
          } );
      },
      invalid : function ( view, attr, error ) {
          var $el = view.$( '#' + attr );
          if ( $el.length  === 0 ) {
              $el = view.$( '[name=' + attr + ']' );
          }
          $el.focus();
          var $group = $el.closest( '.form-group' );
          $group.removeClass( 'has-success' )
              .addClass( 'has-error' );
          //If input is inside an input group $el is changed to place error properly
          if ( $el.parent().hasClass( 'input-group' ) ) {
              $el = $el.parent();
          }
          //If error already exists and its message is n different to new error's message
          //then the previous one is replaced, otherwise the new error is shown with a slide down animation
          if ( $el.next( '.help-block' ).length !== 0 ) {
              $el.next( '.help-block' )[0].innerText = error;
          }else if ( $el.children( '.help-block' ).length !== 0 ) {
              $el.children( '.help-block' )[0].innerText = error;
          }else {
              var $error = $( '<div>' )
                  .addClass( 'help-block' )
                  .html( error )
                  .hide();
              //Place error
              if ( $el.prop( 'tagName' ) === 'div' && !$el.hasClass( 'input-group' ) ) {
                    $el.append( $error );
              }else {
                  $el.after( $error );
              }
              //Showing animation on error message
              $error.slideDown();
          }
      }
  } );



module.exports = Application;




 
