/**
 * Created by Administrator on 2017/4/14.
 */
var BackBone = require( 'backbone' );

require( '../apps/users/routers/userrouters' );

//require( '../apps/login/routes/router' );

require( '../apps/contacts/routers/contactsrouter' );



module.exports = BackBone.Router.extend( {
    routes : {
        '' : 'root'
    },
    root : function () {
        this.navigate( 'login', { trigger : true } );
    }
} );
