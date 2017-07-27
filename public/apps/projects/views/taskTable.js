/**
 * Created by Administrator on 2017/7/26.
 */

var Backbone = require( 'backbone' ),
    Mustache = require( 'mustache' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/taskTable.html', 'utf8' ),
    View;

View = module.exports = Backbone.View.extend( {
    className : 'panel panel-white',
    template : template,
    events : {
        'click .createtask' : 'addTask',
        'click .task-delete' : 'deleteTask',
        'click .task-edit' : 'editTask'
    },
    render : function () {
        var html = Mustache.to_html( this.template, { items : this.collection.toJSON() } );
        this.$el.html( html );
        return this;
    },
    deleteTask : function ( ev ) {
        "use strict";
        var num = this.$(ev.currentTarget).data('index');
        this.trigger( 'item:task:delete',  this.collection.get( num ) );
    },
    editTask : function ( ev ) {
        "use strict";
        var num = this.$(ev.currentTarget).data('index');
        window.app.router.navigate( 'projects/edit/' +  num , true );
    },
    addTask : function () {
        "use strict";
        window.app.router.navigate( '/projects/new', true );
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