/**
 * Created by Administrator on 2017/5/31.
 */

var ModelView = require( './modelview' ),
    Region = require( './region' ),
    _ = require( 'underscore' ),
    Layout;

Layout = module.exports = ModelView.extend( {
    render : function () {
        "use strict";
        this.closeRegions();
        var result = ModelView.prototype.render.call( this );
        this.configRegions();
        return result;
    },
    configRegions : function () {
        "use strict";
        var regionDefinitions = this.regions || {},
            $el, app = this;
        if ( ! this._regions ) {
            this._regions = {};
        }
        _.each( regionDefinitions, function ( selector, name ) {
            $el = app.$(selector);
            app._regions[ name ] = new Region( { el : $el } );
        } );
    },


    getRegion : function ( regionName ) {
        "use strict";
        var regions = this._regions || {};
        return regions[ regionName ];
    },
    destroy : function ( options ) {
        "use strict";
        ModelView.prototype.destroy.call( this, options );
        this.closeRegions();
    },
    closeRegions : function () {
        "use strict";
        var regions = this._regions || {};
        _.each( regions, function ( region ) {
            if ( region && region.destroy ) {
                region.destroy();
            }
        } );
    }
} );