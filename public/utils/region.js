/**
 * Created by Administrator on 2017/5/31.
 */

var Region;

Region = module.exports = function ( options ) {
    "use strict";
     var el = options.el, $el,
         currentView, ensureEL;

     this.show = function ( view ) {
         this.closeView( currentView );
         currentView = view;
         this.openView( currentView );
     };

    this.closeView = function ( view ) {
        if ( view && view.destroy ) {
            view.destroy();
        }
    };

    this.openView = function ( view ) {
        ensureEL();
        view.render();
        $el.html( view.el );
        if ( view.onShow ) {
            view.onShow();
        }
    };

    ensureEL = function () {
        if ( $el ) { return; }
        $el = $( el );
    };

    this.destroy = function () {
        this.closeView( currentView );
    };
};
