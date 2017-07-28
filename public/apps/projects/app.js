/**
 * Created by Administrator on 2017/7/18.
 */
var
    ProjectController = require( './controllers/projectController' ),
    BridgeController = require( './controllers/bridgeController' ),
    TaskController = require( './controllers/taskController' ),
    ProjectCollection = require( './collections/projects' ),
    TaskCollection = require( './collections/tasks' ),
    ProjectModel = require( './models/project' ),
    BridgeModel = require( './models/bridge' ),
    TaskModel = require( './models/task' ),
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
        bridges.fetch(
            {
                data: $.param({ routename: name}),
                success : function ( collection ) {
                    var bridgeList = me.startController(BridgeController);
                    bridgeList.showList( collection, name );
                },
                error : function () {

                }
            }
        );
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

    this.ShowBridgeDetail = function ( projectname, bridgename ) {
        var bridge = new BridgeModel( { bridgename : bridgename } ),
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

    this.ShowNewBridgeForm = function ( projectname ) {
        var project = new ProjectModel( { projectname : projectname } ),
            me = this;
        project.fetch( {
            success : function ( data ) {
                var bridgeEditor = me.startController(BridgeController);
                bridgeEditor.showEditor( new BridgeModel( {
                    routenumber : data.get( 'projectnumber' ),
                    routename : data.get( 'projectname' ),
                    routelevel : data.get( 'roadgrade' )
                } )  );
            },
            error : function () {

            }
        } );


    };

    this.ShowNewProjectForm = function () {
        var projectEditor = this.startController(ProjectController);
        projectEditor.showEditor( new ProjectModel()  );
    };

    this.ShowProjectEditorById = function ( projectname ) {
        var project = new ProjectModel( {
                projectname : projectname
            } ),
            app = this;
        project.fetch( {
            success : function ( project ) {
                var projectViewer = app.startController(ProjectController);
                projectViewer.showEditor(project);
            },
            error : function () {
                // window.app.router.navigate('login', {trigger: true});
            }
        } );
    };

    this.ShowBridgeEditor = function ( projectname, bridgename ) {
        var bridge = new BridgeModel( { routename : projectname, bridgename : bridgename } ),
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

    this.ShowNewTaskForm = function ( projectname ) {
        var bridges = new BridgeCollection(),
            project = new ProjectModel( { projectname : projectname } ),
            me = this;
        $.when(project.fetch(), bridges.fetch( { data: $.param({ routename: projectname}) } ) )
            .done(
                function(project , brs ) {
                    var task =  new TaskModel( {
                        routenumber : project[0]['projectnumber'],
                        routename : project[0][ 'projectname']
                    } );
                    var bbs = brs[0];
                    bbs.forEach(function(obj) { obj.checked = true; });
                    task.set( 'bridges', bbs );
                    var taskEditor = me.startController(TaskController);
                    taskEditor.showEditor( task );
            });
    };

    this.ShowTaskEditor = function ( projectname, taskname ) {
        var task = new TaskModel( { routename : projectname, taskname : taskname } ),
            bridges = new BridgeCollection(),
            me = this;
        $.when( bridges.fetch( { data: $.param({ routename: projectname}) } ), task.fetch() )
            .done(
                function(bb , tt ) {
                    var
                        tts = tt[0],
                        eet = tts.bridges,
                        bbs = bb[0];
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

};

_.extend( App.prototype, AppBase );

module.exports = App;