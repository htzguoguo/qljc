/**
 * Created by Administrator on 2017/5/17.
 */
var BaseView = require( './baseview' ),
    Mustache = require( 'mustache' ),
    _ = require( 'underscore' ),
    ModelView;

ModelView = module.exports = BaseView.extend( {
    render : function () {
        "use strict";
        var data = this.serializeData(),
            renderedHtml, compliedTemplate;
        if ( _.isFunction( this.template ) ) {
            renderedHtml = this.template( data );
        }else if ( _.isString( this.template ) ) {
            this.complieTemplate();
            renderedHtml = Mustache.render(this.template, data );
        }
        // Put the result in Dom
        this.$el.html( renderedHtml );
        if ( this.onRender ) {
            this.onRender();
        }
        return this;
    },
    complieTemplate : function () {
        "use strict";
        return Mustache.parse( this.template );
    },
    serializeData : function () {
        "use strict";
        let data;
        // Serialize only if a model is present
        if ( this.model ) {
            data = this.model.toJSON();
        }
        return data;
    }
} );



