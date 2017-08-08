/**
 * Created by Administrator on 2017/8/7.
 */

var Backbone = require( 'backbone' ),
    Mustache = require( 'mustache' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/managementTable.html', 'utf8' ),
    View;

View = module.exports = Backbone.View.extend( {
    className : 'panel panel-white',
    template : template,
    events : {
        'click .createmanagement' : 'addManagement',
        'click .management-delete' : 'deleteManagement',
        'click .management-edit' : 'editManagement'
    },
    initialize: function( attrs ) {
        this.options = attrs;
    },
    render : function () {
        var data = {
            items:  this.collection.toJSON(),
            index: function() {
                return ++window['INDEX']||(window['INDEX']=1);
            }
            , resetIndex: function() {
                window['INDEX']=null;
                return;
            }
        };

        var html = Mustache.to_html( this.template, data );
        this.$el.html( html );
        return this;
    },
    deleteManagement : function ( ev ) {
        "use strict";
        var num = this.$(ev.currentTarget).data('index');
        this.trigger( 'item:management:delete',  this.collection.get( num ) );
    },
    editManagement : function ( ev ) {
        "use strict";
        var num = this.$(ev.currentTarget).data('index');
        window.app.router.navigate( 'managements/'  +  num  + '/edit', true );
    },
    addManagement : function () {
        "use strict";
        window.app.router.navigate( '/managements/new', true );
    },
    onShow : function () {
        // Table setup
        // ------------------------------
        // Setting datatable defaults

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