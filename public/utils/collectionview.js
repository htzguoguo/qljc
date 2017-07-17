/**
 * Created by Administrator on 2017/5/22.
 */

var BaseView = require( './baseview' ),
    Backbone = require( 'backbone' ),
    _ = require( 'underscore' ),
    CollectionView;

CollectionView = module.exports = BaseView.extend( {
    initialize : function () {
        "use strict";
        // Keep track of rendered items
        this.children = {};
        this.listenTo( this.collection, 'add', this.modelAdded );
        this.listenTo( this.collection, 'remove', this.modelRemoved );
        this.listenTo( this.collection, 'reset', this.render );
    },

    modelRemoved : function ( model ) {
        "use strict";
        var view = this.children[ model.cid ];
        this.closeChildView(view);
    },
    destroy : function () {
        "use strict";

        Backbone.View.prototype.remove.call( this );
        this.closeChildren();
    },
    closeChildren : function () {
        "use strict";
        var children = this.children || {}, app = this;
        _.each( children, function ( child ) {
            app.closeChildView( child );
        } );
    },
    closeChildView : function ( view ) {
        "use strict";
        if ( !view ) {
            return;
        }
        if ( _.isFunction( view.destroy ) ) {
            view.destroy();
        }
        this.stopListening( view );
        if ( view.model ) {
            this.children[ view.model.cid ] = undefined;
        }
    },
    modelAdded : function ( model ) {
        "use strict";

        var view = this.renderModel( model );
        this.$el.append( view.$el );
    },
    renderModel : function ( model ) {
        "use strict";
        var view = new this.modelView( { model : model } );
        this.children[ model.cid ] = view;
        this.listenTo( view, 'all', function ( eventName ) {
            this.trigger( 'item:' + eventName, view, model );
        } );
        view.render();
        return view;
    },
    render : function () {
        "use strict";
        var view, html, app = this;
        this.closeChildren();
        html = this.collection.map( function ( model ) {
            view = app.renderModel( model );
            return view.$el;
        } );
        this.$el.html( html );
        return this;
    },
    onShow : function () {
        var children = this.children || {};
        _.each( children, function ( child ) {
            if ( child.onShow ) {
                child.onShow();
            }
        } );
    }
} );
