/**
 * Created by Administrator on 2017/7/18.
 */
/**
 * Created by Administrator on 2017/5/16.
 */

var Backbone = require( 'backbone' ),
    ContactApp = require( '../app' ),
    ContactsRouters;

ContactsRouters = module.exports = Backbone.Router.extend( {
    routes : {
        'projects/view/:id' : 'projectProfile',
        'projects/edit/:id' : 'editProject',
        'projects/new' : 'createProject',
        'projects' : 'projectList',

        'bridges' : 'bridgeList',
        'bridges/:projectname' : 'bridgeListOfProject',
        'bridges/bridge/new' : 'createBridge',
        'bridges/:bridgename/:id/view' : 'bridgeDetail',
        'bridges/:bridgename/:id/edit' : 'editBridge',

        'tasks/:projectname' : 'taskList',
        'tasks/:projectname/new' : 'createTask',
        'tasks/:projectname/:taskename/edit' : 'editTask',

        'managements' : 'managementList',
        'managements/new' : 'createManagement',
        'managements/:name/edit' : 'editManagement'
    },
    projectProfile : function ( id ) {
        "use strict";
        var app = this.startApp();
        app.showContactById( id );
        updateNavigationBar(  [
            {   title : '项目管理',
                url : 'projects'
            },
            {   title : '查看',
                url : ''
            }
        ] );
    },
    projectList : function () {
        "use strict";
        var app = this.startApp();
        app.ShowProjectList(  );
        updateNavigationBar(  [
            {   title : '项目管理',
                url : 'projects'
            }
        ] );
    },
    createProject : function () {
        var app = this.startApp();
        app.ShowNewProjectForm();
        updateNavigationBar(  [
            {   title : '项目管理',
                url : 'projects'
            },
            {   title : '新建',
                url : ''
            }
        ] );
    },
    editProject : function ( id ) {
        var app = this.startApp();
        app.ShowProjectEditorById( id );
        updateNavigationBar(  [
            {   title : '项目管理',
                url : 'projects'
            },
            {   title : '编辑',
                url : ''
            }
        ] );
    },

    bridgeList : function () {
        "use strict";
        var app = this.startApp();
        app.ShowBridgeList(  );
        updateNavigationBar(  [
            {   title : '桥梁管理',
                url : 'bridges'
            }
        ] );
    },

    bridgeListOfProject : function ( projectname ) {
        "use strict";
        var app = this.startApp();
        app.ShowBridgeList( projectname );
        updateNavigationBar(  [
            {   title : '项目管理',
                url : 'projects'
            },
            {   title : projectname,
                url : 'bridges/' + projectname
            }
        ] );
    },

    bridgeDetail : function ( bridgename, id ) {
        "use strict";
        var app = this.startApp();
        app.ShowBridgeDetail( bridgename, id );
        updateNavigationBar(  [
            {   title : '桥梁管理',
                url : 'bridges'
            },
            {   title : bridgename,
                url : 'bridges/' + bridgename + '/' + id +  '/view'
            },
            {   title : '桥梁卡片',
                url : ''
            }
        ] );
    },

    editBridge : function ( bridgename, id ) {
        "use strict";
        var app = this.startApp();
        app.ShowBridgeEditor( bridgename, id );
        updateNavigationBar(  [
            {   title : '桥梁管理',
                url : 'bridges'
            },
            {   title : bridgename,
                url : 'bridges/' + bridgename + '/' + id +  '/edit'
            },
            {   title : '编辑',
                url : ''
            }
        ] );
    },

    createBridge : function (  ) {
        var app = this.startApp();
        app.ShowNewBridgeForm(  );
        updateNavigationBar(  [
            {   title : '桥梁管理',
                url : 'bridges'
            },
            {   title : '新建',
                url : ''
            }
        ] );
    },

    taskList : function ( projectname ) {
        "use strict";
        var app = this.startApp();
        app.ShowTaskList( projectname );
        updateNavigationBar(  [
            {   title : '项目管理',
                url : 'projects'
            },
            {   title : projectname,
                url : 'tasks/' + projectname
            }
        ] );
    },

    createTask : function ( projectname ) {
        var app = this.startApp();
        app.ShowNewTaskForm( projectname );
        updateNavigationBar(  [
            {   title : '项目管理',
                url : 'projects'
            },
            {   title : projectname,
                url : 'tasks/' + projectname
            },
            {   title : '新建',
                url : ''
            }
        ] );
    },

    editTask : function ( projectname, taskname ) {
        "use strict";
        var app = this.startApp();
        app.ShowTaskEditor( projectname, taskname );
        updateNavigationBar(  [
            {   title : '项目管理',
                url : 'projects'
            },
            {   title : projectname,
                url : 'tasks/' + projectname
            },
            {   title : taskname,
                url : 'tasks/' + projectname + '/' + taskname + '/edit'
            },
            {   title : '编辑',
                url : ''
            }
        ] );
    },

    managementList : function (  ) {
        "use strict";
        var app = this.startApp();
        app.ShowManagementList(  );
        updateNavigationBar(  [
            {   title : '管养单位',
                url : 'managements'
            }
        ] );
    },

    createManagement : function (  ) {
        var app = this.startApp();
        app.ShowNewManagementForm(  );
        updateNavigationBar(  [
            {   title : '管养单位',
                url : 'managements'
            },
            {   title : '新建',
                url : ''
            }
        ] );
    },

    editManagement : function ( name ) {
        "use strict";
        var app = this.startApp();
        app.ShowManagementEditorById( name);
        updateNavigationBar(  [
            {   title : '管养单位',
                url : 'managements'
            },
            {   title : name,
                url : 'managements/' + name +  '/edit'
            },
            {   title : '编辑',
                url : ''
            }
        ] );
    },

    startApp : function () {
        "use strict";
        return window.app.startSubApplication( ContactApp );
    }
} );

function updateNavigationBar( items ) {
    var bars = [], bar;
    $.each( items, function ( index, value ) {
         bar = {
             title : value.title,
             url : value.url
         };
         if ( index === 0 ) {
             bar.isfirst = true;
             bar.isactive = true;
         }
         if ( index === items.length - 1 ) {

         }else {
             bar.isactive = true;
         }
         bars[ index ] = bar;
    } );
    window.app.trigger( 'app:navigation:change', bars);
}

window.app.Routers.ContactsRouter = ContactsRouters;



