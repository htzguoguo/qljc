/**
 * Created by Administrator on 2017/7/26.
 */

var BridgeList,
    Backbone = require( 'backbone' ),
    TaskCollection = require( '../collections/tasks' ),
    App = require( '../../../utils/basecontroller' ),
    _ = require( 'underscore' ),
    ProjectListLayout = require( '../views/projectListLayout' ),
    TaskTable = require( '../views/taskTable' ),
    TaskForm = require( '../views/taskForm' )
    ;


BridgeList = module.exports = function ( options ) {
    "use strict";
    this.mainRegion = options.mainRegion;
    this.isNew = false;
    _.extend( this, Backbone.Events );
    this.showList = function ( tasks, projectname  ) {
        var layout = new ProjectListLayout(),
            taskTable = new TaskTable( { collection : tasks, projectname : projectname }  );


        this.mainRegion.show( layout );
        layout.getRegion( 'list' ).show( taskTable );
        this.listenTo(  taskTable, 'item:task:delete', this.deleteBridge );
    };

    this.showEditor = function ( task ) {
        var layout = new ProjectListLayout(),
            form = new TaskForm( { model : task } )
        ;
        this.isNew = task.isNew();
        this.mainRegion.show( layout );
        layout.getRegion( 'list' ).show( form );
        this.listenTo( form, 'form:cancel', this.cancel );
        this.listenTo( form, 'form:save', this.saveTask );
    };

    this.cancel = function ( task ) {
        var msg = '';
        if ( this.isNew ) {
            msg = '确定要取消创建检测任务';
        }else {
            msg = '确定要取消编辑检测任务';
        }
        this.askConfirmation( msg, true, function ( isConfirm ) {
            if ( isConfirm ) {
                window.app.router.navigate( '/tasks/' + task.get( 'routename' ), true );
            }
        } );
    };

    this.saveTask = function ( task ) {
        var me = this;
        if ( ! task.isValid( true ) ) {
            return;
        }
        function notifyAndRedirect( msg ) {
            me.notifySuccess( msg );
            window.app.router.navigate(  '/tasks/' + task.get( 'routename' ), true );
        }
        task.save( null , {
            success : function () {
                if ( me.isNew ) {
                    notifyAndRedirect('检测任务创建完成');
                }else {
                    notifyAndRedirect('检测任务编辑完成');
                }

                return;
            },
            error : function () {
                if ( me.isNew ) {
                    me.notifyError( '检测任务创建不成功' );
                }else {
                    me.notifyError( '检测任务编辑不成功' );
                }

            }});
    };


};

_.extend( BridgeList.prototype, App );


