/**
 * Created by Administrator on 2017/7/25.
 */

var CollectionView = require( '../../../utils/collectionview' ),
    ItemView = require( './bridgeForm_engrecord_item' ),
    ListView
;

ListView = module.exports = CollectionView.extend( {
    modelView : ItemView,
    tagName : 'tbody'
} );

