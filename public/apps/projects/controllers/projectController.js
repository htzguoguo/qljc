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
    this.isNew = false;
    _.extend( this, Backbone.Events );
    this.showList = function ( projects ) {
        var layout = new ProjectListLayout(),
          /*  actionbar = new ProjectListActionBar(),*/
            projectList = new ProjectTable( {collection: projects} );
        this.mainRegion.show( layout );
      /*  layout.getRegion( 'actions' ).show( actionbar );*/
        layout.getRegion( 'list' ).show( projectList );
        this.listenTo(  projectList, 'item:project:delete', this.deleteProject );
    };

    this.showEditor = function ( project ) {
        var layout = new ProjectListLayout(),
            form = new ProjectForm( { model : project } );

        console.log( 'showEditor', project.bridges );
        this.isNew = project.isNew();
        this.mainRegion.show( layout );
        layout.getRegion( 'list' ).show( form );
        this.listenTo( form, 'form:cancel', this.cancel );
        this.listenTo( form, 'form:save', this.saveProject );
    };

    this.cancel = function () {
        var msg = '';
        if ( this.isNew ) {
            msg = '确定要取消创建检测项目';
        }else {
            msg = '确定要取消编辑检测项目';
        }
        this.askConfirmation( msg, true, function ( isConfirm ) {
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
        function notifyAndRedirect( msg ) {
            me.notifySuccess( msg );
            window.app.router.navigate( '/projects', true );
        }

        project.save( null , {
            success : function () {
                    if ( me.isNew ) {
                        notifyAndRedirect('检测项目创建完成');
                    }else {
                        notifyAndRedirect('检测项目编辑完成');
                    }

                    return;
            },
            error : function () {
                if ( me.isNew ) {
                    me.notifyError( '检测项目创建不成功' );
                }else {
                    me.notifyError( '检测项目编辑不成功' );
                }

            }});
    };

    this.deleteProject = function ( project ) {
        var app = this;
        this.askConfirmation( '确认要删除检测项目', false,  function ( isConfirm ) {
            if ( isConfirm ) {
                project.destroy( {
                    success : function () {
                        app.successMessage( '删除检测项目完成' );
                      /*  window.app.router.navigate( '/projects', {trigger: true} );*/

                        window.app.router.navigate( '/projects/aaa', {trigger: false} );
                        window.app.router.navigate( '/projects', {trigger: true} );
                       /* Backbone.history.loadUrl(Backbone.history.fragment);*/
                    },
                    error : function () {
                        app.errorMessage( '删除操作没有成功' );
                    }
                } );
            }
        } );
    };
};

_.extend( ProjectList.prototype, App );
