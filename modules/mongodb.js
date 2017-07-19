/**
 * Created by Administrator on 2017/7/19.
 */

mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://localhost/qljc', { useMongoClient: true } );

module.exports = mongoose;
