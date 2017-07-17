/**
 * Created by Administrator on 2017/6/14.
 */

var CollectionView = require( '../../../utils/collectionview' ),
    EmailListModelView = require( './emaillistitem' ),
    EmailListView
    ;

EmailListView = module.exports = CollectionView.extend( {
    modelView : EmailListModelView
} );
