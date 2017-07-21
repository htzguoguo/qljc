/**
 * Created by Administrator on 2017/7/18.
 */
var
    ProjectController = require( './controllers/projectController' ),
    BridgeController = require( './controllers/bridgeController' ),
    ProjectCollection = require( './collections/projects' ),
    ProjectModel = require( './models/project' ),
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

    this.ShowBridgeList = function () {
        "use strict";
        var projects = new ProjectCollection(),
            me = this;
        projects.fetch(
            {
                success : function ( collection ) {
                    var bridgeList = me.startController(BridgeController);
                    bridgeList.showList(collection);
                },
                error : function () {

                }
            }
        );
    };

    this.ShowNewProjectForm = function () {
        var projectEditor = this.startController(ProjectController);
        projectEditor.showEditor( new ProjectModel()  );
    };

    this.ShowProjectEditorById = function ( projectnumber ) {
        var project = new ProjectModel( {
                projectnumber : projectnumber
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