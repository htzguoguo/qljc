/**
 * Created by Administrator on 2017/4/26.
 */

var contacts = require( './contacts_v2' ),
    express = require( 'express' ),
    router = express.Router();

router.use( '/contacts', contacts );

module.exports = router;

