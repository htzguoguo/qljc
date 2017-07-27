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
        'bridges/:projectname/new' : 'createBridge',
        'bridges/:projectname/:bridgename/view' : 'bridgeDetail',
        'bridges/:projectname/:bridgename/edit' : 'editBridge',

        'tasks/:projectname' : 'taskList'
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

    bridgeDetail : function ( projectname, bridgename ) {
        "use strict";
        var app = this.startApp();
        app.ShowBridgeDetail( projectname, bridgename );
        updateNavigationBar(  [
            {   title : '项目管理',
                url : 'projects'
            },
            {   title : projectname,
                url : 'bridges/' + projectname
            },
            {   title : bridgename,
                url : 'bridges/' + projectname + '/' + bridgename + '/view'
            },
            {   title : '桥梁卡片',
                url : ''
            }
        ] );
    },

    editBridge : function ( projectname, bridgename ) {
        "use strict";
        var app = this.startApp();
        app.ShowBridgeEditor( projectname, bridgename );
        updateNavigationBar(  [
            {   title : '项目管理',
                url : 'projects'
            },
            {   title : projectname,
                url : 'bridges/' + projectname
            },
            {   title : bridgename,
                url : 'bridges/' + projectname + '/' + bridgename + '/view'
            },
            {   title : '编辑',
                url : ''
            }
        ] );
    },

    createBridge : function ( projectname ) {
        var app = this.startApp();
        app.ShowNewBridgeForm( projectname );
        updateNavigationBar(  [
            {   title : '项目管理',
                url : 'projects'
            },
            {   title : projectname,
                url : 'bridges/' + projectname
            },
            {   title : '新建',
                url : ''
            }
        ] );
    },

    taskList : function ( projectname ) {
        "use strict";
        var app = this.startApp();
        app.ShowTaskList(  );
        updateNavigationBar(  [
            {   title : '项目管理',
                url : 'projects'
            },
            {   title : projectname,
                url : 'bridges/' + projectname
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



