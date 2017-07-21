/**
 * Created by Administrator on 2017/7/21.
 */

var Backbone = require( 'backbone' ),
    Mustache = require( 'mustache' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/projectsSidebar.html', 'utf8' ),
    View;

View = module.exports = Backbone.View.extend( {
    className : 'panel panel-white',
    template : template,
    events : {
        'click .project-nav' : 'selectProject'
    },
    render : function () {
        var html = Mustache.to_html( this.template, { projects : this.collection.toJSON() } );
        this.$el.html( html );
        return this;
    },
    selectProject : function ( ev ) {
        "use strict";
        var num = this.$(ev.currentTarget).data('index');
        this.trigger( 'item:project:select',  num );
        this.$( '.projects-container li' ).removeClass( 'active' );
        this.$(ev.currentTarget).parent().addClass( 'active' );
    }
} );


