/**
 * Created by Administrator on 2017/7/24.
 */


var CollectionView = require( '../../../utils/collectionview' ),
    ItemView = require( './bridgeFrom_superstructure_item' ),
    ListView
;

ListView = module.exports = CollectionView.extend( {
    modelView : ItemView,
    tagName : 'tbody'

} );