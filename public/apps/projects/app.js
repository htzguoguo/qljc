/**
 * Created by Administrator on 2017/7/18.
 */
var
    ProjectController = require( './controllers/projectController' ),
    BridgeController = require( './controllers/bridgeController' ),
    ProjectCollection = require( './collections/projects' ),
    ProjectModel = require( './models/project' ),
    BridgeModel = require( './models/bridge' ),
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
        var projects = new ProjectCollection(),
            me = this;
        projects.fetch(
            {
                success : function ( collection ) {
                    if ( ! name ) {
                        if ( collection && collection.length > 0 ) {
                            name = collection.at(0).get( 'projectname' );
                        }
                    }
                    var bridgeList = me.startController(BridgeController);
                    bridgeList.showList(collection, name);
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
};

_.extend( App.prototype, AppBase );

module.exports = App;