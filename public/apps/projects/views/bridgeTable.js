/**
 * Created by Administrator on 2017/7/21.
 */


/**
 * Created by Administrator on 2017/7/18.
 */
var Backbone = require( 'backbone' ),
    Mustache = require( 'mustache' ),
    _ = require( 'underscore' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/bridgeTable.html', 'utf8' ),
    View;

View = module.exports = Backbone.View.extend( {
    className : 'panel panel-white',
    template : template,
    initialize: function( attrs ) {
        this.options = attrs;
    },
    events : {
        'click .bridge-new' : 'addProject',
        'click .bridge-delete' : 'deleteProject',
        'click .bridge-edit' : 'editProject',
        'click .bridge-preview' : 'previewBridge'
    },
    render : function () {
        var html;
        if ( this.collection ) {
            html = Mustache.to_html( this.template, {  items : this.collection.toJSON() } );
        }else {
            html = Mustache.to_html( this.template, {   items : [] } );
        }
        this.$el.html( html );
        return this;
    },
    previewBridge : function ( ev ) {
        var bridgename = this.$(ev.currentTarget).data('index'),
            routename = this.$(ev.currentTarget).data('project');
        window.app.router.navigate( 'bridges/' + routename + '/' + bridgename + '/view', true );
    },
    deleteProject : function ( ev ) {
        "use strict";
        var num = this.$(ev.currentTarget).data('index');
        this.trigger( 'item:project:delete',  this.collection.get( num ) );
    },
    editProject : function ( ev ) {
        "use strict";
        var num = this.$(ev.currentTarget).data('index');
        window.app.router.navigate( 'projects/edit/' +  num , true );
    },
    addProject : function () {
        "use strict";
        window.app.router.navigate( '/projects/new', true );
    },
    onShow : function () {
        // Table setup
        // ------------------------------
        // Setting datatable defaults
        // Basic responsive configuration
        $( '.text-primary' ).html( this.options.projectname );

        // Basic responsive configuration
        $('.datatable-responsive').DataTable( {
            columnDefs: [{
                orderable: false,
                targets: [ 6 ]
            }],
        } );

        // ------------------------------

        // Add placeholder to the datatable filter option
        $('.dataTables_filter input[type=search]').attr('placeholder','请输入搜索内容...');


        // Enable Select2 select for the length option
        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity,
            width: 'auto'
        });
    }
} );