/**
 * Created by Administrator on 2017/8/8.
 */

var Backbone = require( 'backbone' ),
    Mustache = require( 'mustache' ),
    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/managementSidebar.html', 'utf8' ),
    View;

View = module.exports = Backbone.View.extend( {
    className : 'panel panel-white',
    template : template,
    events : {
        'click .management-nav' : 'selectManagement'
    },
    render : function () {
        var html = Mustache.to_html( this.template, { managements : this.collection.toJSON() } );
        this.$el.html( html );
        return this;
    },
    onShow : function () {
        if ( this.selectedManagement ) {
            this.$( '.management-container li a[data-index=' + this.selectedManagement +  ']' ).trigger( 'click' );
        }
    },
    selectManagement : function ( ev ) {
        "use strict";
        var num = this.$(ev.currentTarget).data('index');
        this.trigger( 'item:management:select',  num );
        this.$( '.management-container li' ).removeClass( 'active' );
        this.$(ev.currentTarget).parent().addClass( 'active' );
    }
} );


