/**
 * Created by Administrator on 2017/8/7.
 */

var ManagementList,
    Backbone = require( 'backbone' ),
    ManagementCollection = require( '../collections/managements' ),
    App = require( '../../../utils/basecontroller' ),
    _ = require( 'underscore' ),
    ProjectListLayout = require( '../views/projectListLayout' ),
    ManagementTable = require( '../views/managementTable' ),
    ManagementForm = require( '../views/managementForm' )
;


ManagementList = module.exports = function ( options ) {
    "use strict";
    this.mainRegion = options.mainRegion;
    this.isNew = false;
    _.extend( this, Backbone.Events );
    this.showList = function ( managements ) {
        var layout = new ProjectListLayout(),
            managementTable = new ManagementTable( { collection : managements }  );
        this.mainRegion.show( layout );
        layout.getRegion( 'list' ).show( managementTable );
        this.listenTo(  managementTable, 'item:management:delete', this.deleteManagement );
    };

    this.showEditor = function ( management ) {
        var layout = new ProjectListLayout(),
            form = new ManagementForm( { model : management } )
        ;
        this.isNew = management.isNew();
        this.mainRegion.show( layout );
        layout.getRegion( 'list' ).show( form );
        this.listenTo( form, 'form:cancel', this.cancel );
        this.listenTo( form, 'form:save', this.saveManagement );
    };

    this.cancel = function ( management ) {
        var msg = '';
        if ( this.isNew ) {
            msg = '确定要取消创建管养单位';
        }else {
            msg = '确定要取消编辑管养单位';
        }
        this.askConfirmation( msg, true, function ( isConfirm ) {
            if ( isConfirm ) {
                window.app.router.navigate( '/managements', true );
            }
        } );
    };

    this.saveManagement = function ( management ) {
        var me = this;
        if ( ! management.isValid( true ) ) {
            return;
        }
        function notifyAndRedirect( msg ) {
            me.notifySuccess( msg );
            window.app.router.navigate(  '/managements', true );
        }
        management.save( null , {
            success : function () {
                if ( me.isNew ) {
                    notifyAndRedirect('管养单位创建完成');
                }else {
                    notifyAndRedirect('管养单位编辑完成');
                }

                return;
            },
            error : function () {
                if ( me.isNew ) {
                    me.notifyError( '管养单位创建不成功' );
                }else {
                    me.notifyError( '管养单位编辑不成功' );
                }

            }});
    };

    this.deleteManagement = function ( management ) {
        var app = this;
        this.askConfirmation( '确认要删除管养单位', false,  function ( isConfirm ) {
            if ( isConfirm ) {
                management.destroy( {
                    success : function () {
                        app.successMessage( '删除管养单位完成' );

                        window.app.router.navigate( '/managements/a/b', {trigger: false} );
                        window.app.router.navigate( '/managements' , {trigger: true} );
                        /* Backbone.history.loadUrl(Backbone.history.fragment);*/
                    },
                    error : function () {
                        app.errorMessage( '删除管养单位成功' );
                    }
                } );
            }
        } );
    };
};

_.extend( ManagementList.prototype, App );


