/**
 * Created by Administrator on 2017/7/18.
 */
var Backbone = require( 'backbone' ),
    Mustache = require( 'mustache' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/projectTable.html', 'utf8' ),
    View;

View = module.exports = Backbone.View.extend( {
    className : 'panel panel-white',
    template : template,
    events : {
        'click .createproject' : 'addProject',
        'click .project-delete' : 'deleteProject',
        'click .project-edit' : 'editProject',
        'click .project-bridge' : 'openBridge',
        'click .project-task' : 'openTask'
    },
    render : function () {
        var html = Mustache.to_html( this.template, { items : this.collection.toJSON() } );
        this.$el.html( html );
        return this;
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
    addProject : function ( ev ) {
        "use strict";
        window.app.router.navigate( '/projects/new', true );
    },
    openBridge : function ( ev ) {
        "use strict";
        var name = this.$(ev.currentTarget).data('index');
        window.app.router.navigate( '/bridges/' +  name, true );
    },
    openTask : function ( ev ) {
        "use strict";
        var name = this.$(ev.currentTarget).data('index');
        window.app.router.navigate( '/tasks/' +  name, true );
    },

    onShow : function () {
        // Table setup
        // ------------------------------
        // Setting datatable defaults
        // Basic responsive configuration


        // Basic responsive configuration
        $('.datatable-responsive').DataTable( {
            columnDefs: [{
                orderable: false,
                targets: [ 4 ]
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