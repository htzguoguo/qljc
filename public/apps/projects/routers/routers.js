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
        'bridges' : 'pridgeList'
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

    pridgeList : function () {
        "use strict";
        var app = this.startApp();
        app.ShowBridgeList(  );
        updateNavigationBar(  [
            {   title : '桥梁管理',
                url : 'bridges'
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
             url : value.url,
             isactive : false,
             isfirst : false
         };
         if ( index === 0 ) {
             bar.isfirst = true;
         }
         if ( index === items.length - 1 ) {
             bar.isactive = false;
         }
         bars[ index ] = bar;
    } );
    window.app.trigger( 'app:navigation:change', bars);
}

window.app.Routers.ContactsRouter = ContactsRouters;



