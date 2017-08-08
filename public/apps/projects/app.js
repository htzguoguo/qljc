/**
 * Created by Administrator on 2017/7/18.
 */
var
    ProjectController = require( './controllers/projectController' ),
    BridgeController = require( './controllers/bridgeController' ),
    TaskController = require( './controllers/taskController' ),
    ManagementController = require( './controllers/managementController' ),
    ProjectCollection = require( './collections/projects' ),
    TaskCollection = require( './collections/tasks' ),
    ManagementCollection = require( './collections/managements' ),
    ProjectModel = require( './models/project' ),
    BridgeModel = require( './models/bridge' ),
    TaskModel = require( './models/task' ),
    ManagementModel = require( './models/management' ),
    BridgeCollection = require( './collections/bridges' ),
    AppBase = require( '../../utils/baseapp' ),
    _ = require( 'underscore' ),
    App;

App = function ( options ) {
    "use strict";
    this.currentController = null;
    this.mainRegion = options.mainRegion;
    this.bodyRegion = options.bodyRegion;
    this.GetName = function () {
        "use strict";
        return 'Project';
    };
    this.ShowProjectList = function () {
        "use strict";
        var projects = new ProjectCollection(),
            me = this;
        projects.fetch(
            {
                success : function ( collection ) {
                    var contactList = me.startController(ProjectController);
                    contactList.showList(collection);
                },
                error : function () {

                }
            }
        );
    };

    this.ShowBridgeList = function ( name ) {
        "use strict";
        var me = this;
        var bridges = new BridgeCollection();
        var managements = new ManagementCollection();
        if ( name ) {
            $.when(managements.fetch(), bridges.fetch( { data: $.param({ custodyunit: name}) } ) )
                .done(
                    function(m , b ) {
                        managements = new ManagementCollection( m[0] );
                        bridges = new BridgeCollection( b[0] );
                        var bridgeList = me.startController(BridgeController);
                        bridgeList.showList( managements,bridges , name );
                    }
                );
        }else {
            managements.fetch( {
                success : function ( data ) {
                     if ( data.length > 0 ) {
                         console.log( 'data', data.at(0) );
                         var managementname = data.at(0).get( 'managementname' );
                         bridges.fetch(
                             {
                                 data: $.param({ custodyunit: managementname}),
                                 success : function ( data ) {
                                     var bridgeList = me.startController(BridgeController);
                                     bridgeList.showList( managements, data,  managementname );
                                 },
                                 error : function () {

                                 }
                             }
                         );
                     }else {
                         var bridgeList = me.startController(BridgeController);
                         bridgeList.showList( data, bridges,  '' );
                     }
                },
                error : function () {

                }
            } );

        }
    };

    this.ShowTaskList = function ( name ) {
        "use strict";
        var me = this;
        var bridges = new TaskCollection();
        bridges.fetch(
            {
                data: $.param({ routename: name}),
                success : function ( collection ) {
                    var taskList = me.startController(TaskController);
                    taskList.showList( collection, name );

                },
                error : function () {

                }
            }
        );
    };

    this.ShowBridgeDetail = function ( bridgename, id ) {
        var bridge = new BridgeModel( { id : id } ),
            me = this;
        bridge.fetch(
            {
                success : function ( data ) {
                    var bridgeList = me.startController(BridgeController);
                    bridgeList.showBridgeDetail(data);
                },
                error : function () {

                }
            }
        );
    };

    this.ShowNewBridgeForm = function (  ) {
        var bridgeEditor = this.startController(BridgeController);
        bridgeEditor.showEditor( new BridgeModel(  )  );
    };

    this.ShowBridgeEditor = function ( bridgename, id ) {
        var bridge = new BridgeModel( { id : id } ),
            me = this;
        bridge.fetch( {
            success : function ( data ) {
                var bridgeEditor = me.startController(BridgeController);
                bridgeEditor.showEditor( data );
            },
            error : function () {

            }
        } );
    };

    this.ShowNewProjectForm = function () {
        var bridges = new BridgeCollection(),
           project, me = this;
        bridges.fetch( {
            success : function ( data ) {
                project = new ProjectModel();
                project.setDefaultBridges( data.toJSON() );
                var projectEditor = me.startController(ProjectController);
                projectEditor.showEditor( project  );
            },
            error : function () {
                // window.app.router.navigate('login', {trigger: true});
            }
        } );
    };

    this.ShowProjectEditorById = function ( projectname ) {
        var pp = new ProjectModel( {
                projectname : projectname
            } ),
            bb = new BridgeCollection(),
            project, bridges,
            app = this;
        $.when(pp.fetch(), bb.fetch( ) )
            .done(
                function(p , b ) {
                   project = new ProjectModel( p[0] );
                   bridges = new BridgeCollection( b[0] );
                   project.setDefaultBridges( bridges.toJSON() );
                   var projectEditor = app.startController(ProjectController);
                   projectEditor.showEditor( project  );
                }
                );
    };

    this.ShowNewTaskForm = function ( projectname ) {
        var
            project = new ProjectModel( { projectname : projectname } ),
            me = this;
        project.fetch( {
            success : function ( data ) {
                var task =  new TaskModel( {
                    routenumber : data.get('projectnumber'),
                    routename : data.get( 'projectname')
                } );
                var bbs = data.get( 'bridges' );
                bbs.forEach(function(obj) { obj.checked = true; });
                task.set( 'bridges', bbs );
                console.log( 'ShowNewTaskForm', task );
                var taskEditor = me.startController(TaskController);
                taskEditor.showEditor( task );
            },
            error : function () {
                // window.app.router.navigate('login', {trigger: true});
            }
        } );
    };

    this.ShowTaskEditor = function ( projectname, taskname ) {
        var task = new TaskModel( { routename : projectname, taskname : taskname } ),
            project = new ProjectModel( { projectname : projectname } ),
            me = this;
        $.when( project.fetch( ), task.fetch() )
            .done(
                function(bb , tt ) {
                    var
                        tts = tt[0],
                        eet = tts.bridges,
                        bbs = bb[0].bridges;
                    bbs.forEach(
                        function(obj) {
                            eet.forEach( function ( ee ) {
                                if ( ee.bridgename === obj.bridgename ) {
                                    obj.checked = true;
                                }
                            } );
                        }
                        );
                    task.set( 'bridges', bbs );
                    var taskEditor = me.startController(TaskController);
                    taskEditor.showEditor( task );
                });
    };

    this.ShowManagementList = function (  ) {
        "use strict";
        var me = this;
        var managements = new ManagementCollection();
        managements.fetch(
            {
                success : function ( collection ) {
                    var managementList = me.startController(ManagementController);
                    managementList.showList( collection );

                },
                error : function () {

                }
            }
        );
    };

    this.ShowNewManagementForm = function (  ) {
        var managementEditor = this.startController(ManagementController);
        managementEditor.showEditor( new ManagementModel(  )  );
    };

    this.ShowManagementEditorById = function ( name ) {
        var management = new ManagementModel( { managementname : name } ),
            me = this;
        management.fetch( {
            success : function ( data ) {
                var managementEditor = me.startController(ManagementController);
                managementEditor.showEditor( data );
            },
            error : function () {

            }
        } );
    };


};

_.extend( App.prototype, AppBase );

module.exports = App;