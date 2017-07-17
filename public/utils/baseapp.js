/**
 * Created by Administrator on 2017/5/21.
 */

var App;

App = module.exports =  {
    startController : function ( controller ) {
        if ( this.currentController && this.currentController instanceof  controller) {
            return this.currentController;
        }
        if ( this.currentController && this.currentController.destory ) {
            this.currentController.destroy();
        }
        this.currentController = new controller( { bodyRegion : this.bodyRegion,mainRegion : this.mainRegion } );
        return this.currentController;
    },
    destroy : function() {
        if ( this.currentController && this.currentController.destroy ) {
            this.currentController.destroy();
        }
        // this.region.remove();
        //this.stopListening();
    }

};
