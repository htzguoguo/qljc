/**
 * Created by Administrator on 2017/5/22.
 */

var CollectionView = require( '../../../utils/collectionview' ),
    ContactListItemView = require( './contactlistitem' ),
    ContactListView;

ContactListView = module.exports = CollectionView.extend( {
    modelView : ContactListItemView,
    className : 'contact-list',
   /* render : function () {
        "use strict";
        var view, html, app = this;
        html = this.collection.map( function ( model ) {
            view = app.renderModel( model );
            return view.$el;
        } );
        this.$el.html( this.template );
        this.$el.find( '.list-container' ).html( html );

        return this;
    },
    events : {
        'click .createcontact' : 'addContract'
    },
    addContract : function () {
        "use strict";
        var contact = new ContactModel(),
            app = this;
        contact.set( {
            "firstname": "errt",
            "lastname": "sssssss",
            "title": "bnm.",
            "company": "tygb",
            "jobtitle": "Developer",
            "primarycontactnumber": "12345678",
            "primaryemailaddress": "joe.smith@xyz.com",
        } );
        this.collection.create( contact );
    }*/
} );


