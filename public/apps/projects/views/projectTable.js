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
        'click .project-edit' : 'editProject'
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
    addProject : function () {
        "use strict";
        window.app.router.navigate( '/projects/new', true );
    },
    onShow : function () {
        // Table setup
        // ------------------------------
        // Setting datatable defaults
        // Basic responsive configuration


        // Basic responsive configuration
        $('.datatable-responsive').DataTable();

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