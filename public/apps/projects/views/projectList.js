/**
 * Created by Administrator on 2017/7/18.
 */

var CollectionView = require( '../../../utils/collectionview' ),
    ProjectListItemView = require( './projectListItem' ),
    ProjectListView;

ContactListView = module.exports = CollectionView.extend( {
    modelView : ProjectListItemView,
    className : 'contact-list'
} );
