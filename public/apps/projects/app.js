/**
 * Created by Administrator on 2017/7/18.
 */
var
    ProjectList = require( './controllers/projectList' ),
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
                    var contactList = me.startController(ProjectList);
                    contactList.showList(collection);
                },
                error : function () {

                }
            }
        );
    };

    this.ShowNewProjectForm = function () {
        var projectEditor = this.startController(ProjectList);
        projectEditor.showEditor( new ProjectModel()  );
    };
};

_.extend( App.prototype, AppBase );

module.exports = App;