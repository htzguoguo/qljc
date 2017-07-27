/**
 * Created by Administrator on 2017/7/26.
 */

var BridgeList,
    Backbone = require( 'backbone' ),
    TaskCollection = require( '../collections/tasks' ),
    App = require( '../../../utils/basecontroller' ),
    _ = require( 'underscore' ),
    ProjectListLayout = require( '../views/projectListLayout' ),
    TaskTable = require( '../views/taskTable' )
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

    this.showBridgeDetail = function ( bridge ) {
        var layout = new ProjectListLayout(),
            actionbar = new ProjectListActionBar(),
            bridgePreview = new BridgePreview( { model : bridge } ) ;


        this.mainRegion.show( layout );
        /*  layout.getRegion( 'actions' ).show( actionbar );*/
        layout.getRegion( 'list' ).show( bridgePreview );
    };

    this.showEditor = function ( bridge ) {
        var superstructureData = bridge.get( 'superstructure' ) || [],
            lowerstructureData = bridge.get( 'lowerstructure' ) || [],
            techData = bridge.get( 'technicalstatusassessment' ) || [],
            engData = bridge.get( 'engineeringrecords' ) || []
        ;
        this.superstructures = new SuperStructureCollection( superstructureData );
        this.lowerstructures = new LowerStructureCollection( lowerstructureData );
        this.techassessments = new TechCollection( techData );
        this.engineeringrecords = new EngCollection( engData );

        var layout = new ProjectListLayout(),
            actionbar = new ProjectListActionBar(),
            form = new BridgeForm( { model : bridge } ),
            superstructures = new BridgeForm_superstructure_view( { collection : this.superstructures } ),
            lowerstructures = new BridgeForm_lowerstructure_view( { collection : this.lowerstructures } ),
            tech = new BridgeForm_Tech_view( { collection : this.techassessments } ),
            eng = new BridgeForm_Eng_view( { collection : this.engineeringrecords } )
        ;

        this.isNew = bridge.isNew();
        this.mainRegion.show( layout );
        /*   layout.getRegion( 'actions' ).show( actionbar );*/
        layout.getRegion( 'list' ).show( form );
        form.getRegion( 'superstructures' ).show( superstructures );
        form.getRegion( 'lowerstructures' ).show( lowerstructures );
        form.getRegion( 'tech' ).show( tech );
        form.getRegion( 'eng' ).show( eng );

        this.listenTo( form, 'form:cancel', this.cancel );
        this.listenTo( form, 'form:save', this.saveBridge );

        this.listenTo( form, 'superstructure:add', function () {
            this.superstructures.add( {} );
        } );
        this.listenTo( superstructures, 'item:superstructure:deleted', function ( view, item ) {
            this.superstructures.remove( item );
        } );
        this.listenTo( form, 'lowerstructure:add', function () {
            this.lowerstructures.add( {} );
        } );
        this.listenTo( lowerstructures, 'item:lowerstructure:deleted', function ( view, item ) {
            this.lowerstructures.remove( item );
        } );
        this.listenTo( form, 'tech:add', function () {
            this.techassessments.add( {} );
        } );
        this.listenTo( tech, 'item:tech:deleted', function ( view, item ) {
            this.techassessments.remove( item );
        } );
        this.listenTo( form, 'eng:add', function () {
            this.engineeringrecords.add( {} );
        } );
        this.listenTo( eng, 'item:eng:deleted', function ( view, item ) {
            this.engineeringrecords.remove( item );
        } );
        this.listenTo( form, 'upload:frontphoto:selected', function ( blob ) {
            this.uploadFile( bridge, blob, 'frontphoto' );
        } );
        this.listenTo( form, 'upload:sidephoto:selected', function ( blob ) {
            this.uploadFile( bridge, blob, 'sidephoto' );
        } );
    };

    this.uploadFile = function ( bridge, blob, imgCategory ) {
        File_Upload.uploadfiles( blob, {
            progress : function ( length, uploaded, precent ) {
                app.trigger( 'file:uploading:progress', length, uploaded, precent );
            },
            success : function ( data ) {
                app.trigger( 'file:uploading:done' );
                if ( data && _.isArray( data ) ) {
                    bridge.set( imgCategory, data[0] );
                }
            },
            error : function ( err ) {
                app.trigger( 'file:uploading:error', err );
            }
        } );
    };

    this.cancel = function ( bridge ) {
        var msg = '';
        if ( this.isNew ) {
            msg = '确定要取消创建检测项目';
        }else {
            msg = '确定要取消编辑检测项目';
        }
        this.askConfirmation( msg, true, function ( isConfirm ) {
            if ( isConfirm ) {
                window.app.router.navigate( '/bridges/' + bridge.get( 'routename' ) , true );
            }
        } );
    };

    this.saveBridge = function ( bridge ) {
        var me = this,
            superstructureData = this.superstructures.toJSON(),
            lowerstructureData = this.lowerstructures.toJSON(),
            techData = this.techassessments.toJSON(),
            engData = this.engineeringrecords.toJSON()
        ;
        var superstructureHasError = _.some(this.superstructures.models, function(m) {
            return m.validationError;
        });
        if ( superstructureHasError ) {
            return;
        }
        var lowerstructureHasError = _.some(this.lowerstructures.models, function(m) {
            return m.validationError;
        });
        if ( lowerstructureHasError ) {
            return;
        }

        bridge.set( {
            superstructure : superstructureData,
            lowerstructure : lowerstructureData,
            technicalstatusassessment : techData,
            engineeringrecords : engData
        } );

        if ( ! bridge.isValid( true ) ) {
            return;
        }
        function notifyAndRedirect( msg ) {
            me.notifySuccess( msg );
            window.app.router.navigate( '/bridges/' + bridge.get( 'routename' ), true );
        }
        bridge.save( null , {
            success : function () {
                if ( me.isNew ) {
                    notifyAndRedirect('桥梁卡片创建完成');
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

    this.deleteBridge = function ( bridge ) {
        var app = this,
            routename = bridge.get( 'routename' );
        this.askConfirmation( '确认要删除桥梁', false,  function ( isConfirm ) {
            if ( isConfirm ) {
                bridge.destroy( {
                    success : function () {
                        app.successMessage( '删除桥梁完成' );

                        window.app.router.navigate( '/', {trigger: true} );
                        window.app.router.navigate( '/bridges/' + routename , {trigger: true} );
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

_.extend( BridgeList.prototype, App );


