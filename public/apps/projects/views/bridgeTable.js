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
        'click .bridge-new' : 'addBridge',
        'click .bridge-delete' : 'deleteBridge',
        'click .bridge-edit' : 'editBridge',
        'click .bridge-preview' : 'previewBridge',
        'click .return-to' : 'returnTo'
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
    deleteBridge : function ( ev ) {
        "use strict";
        var num = this.$(ev.currentTarget).data('index');
        this.trigger( 'item:bridge:delete',  this.collection.get( num ) );
    },
    editBridge : function ( ev ) {
        "use strict";
        var bridgename = this.$(ev.currentTarget).data('index'),
            routename = this.$(ev.currentTarget).data('project');
        window.app.router.navigate( 'bridges/' + routename + '/' + bridgename + '/edit', true );
    },
    addBridge : function () {
        "use strict";
        window.app.router.navigate( '/bridges/' + this.options.projectname + '/new', true );
    },
    returnTo : function () {
        window.app.router.navigate( '/projects', true );
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
                targets: [ 8 ]
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