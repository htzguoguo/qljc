/**
 * Created by Administrator on 2017/7/18.
 */

var ProjectList,
    Backbone = require( 'backbone' ),
    App = require( '../../../utils/basecontroller' ),
    _ = require( 'underscore' ),
    ProjectListLayout = require( '../views/projectListLayout' ),
    ProjectListActionBar = require( '../views/projectListAction' ),
    ProjectTable = require( '../views/projectTable' ),
    ProjectForm = require( '../views/projectForm' );

ProjectList = module.exports = function ( options ) {
    "use strict";
    this.mainRegion = options.mainRegion;
    _.extend( this, Backbone.Events );
    this.showList = function ( projects ) {
        var layout = new ProjectListLayout(),
            actionbar = new ProjectListActionBar(),
            contactList = new ProjectTable( {collection: projects} );
        this.mainRegion.show( layout );
        layout.getRegion( 'actions' ).show( actionbar );
        layout.getRegion( 'list' ).show( contactList );
        this.listenTo(  contactList, 'item:contact:delete', this.deleteContact );
    };

    this.showEditor = function ( project ) {
        var layout = new ProjectListLayout(),
            actionbar = new ProjectListActionBar(),
            form = new ProjectForm( { model : project } );

        this.mainRegion.show( layout );
        layout.getRegion( 'actions' ).show( actionbar );
        layout.getRegion( 'list' ).show( form );
        this.listenTo( form, 'form:cancel', this.cancel );
        this.listenTo( form, 'form:save', this.saveProject );
    };

    this.cancel = function () {
        this.askConfirmation( '确定要取消创建检测项目', true, function ( isConfirm ) {
            if ( isConfirm ) {
                window.app.router.navigate( '/projects', true );
            }
        } );
    };

    this.saveProject = function ( project ) {
        var me = this;
        if ( ! project.isValid( true ) ) {
            return;
        }
        function notifyAndRedirect() {
            me.notifySuccess( '检测项目创建完成' );
            window.app.router.navigate( '/projects', true );
        }
        project.save( null , {
            success : function () {
                    notifyAndRedirect();
                    return;
            },
            error : function () {
                me.notifyError( '检测项目创建不成功' );
            }});
    };

    this.deleteContact = function ( view, contact ) {
        var app = this;
        this.askConfirmation( 'The contact will be deleted', false,  function ( isConfirm ) {
            if ( isConfirm ) {
                contact.id = contact.get( 'primarycontactnumber' );
                contact.destroy( {
                    success : function () {
                        app.successMessage( 'The contact was deleted' );
                    },
                    error : function () {
                        app.errorMessage( 'Ooops... Something was wrong' );
                    }
                } );
            }
        } );
    };
};

_.extend( ProjectList.prototype, App );
