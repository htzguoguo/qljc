/**
 * Created by Administrator on 2017/5/22.
 */

var CollectionView = require( '../../../utils/collectionview' ),
    ContactListItemView = require( './contactlistitem' ),
    ContactListView;

ContactListView = module.exports = CollectionView.extend( {
    modelView : ContactListItemView,
    className : 'contact-list'
} );


