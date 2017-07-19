/**
 * Created by Administrator on 2017/4/11.
 */

var express = require( 'express' ),
    router = express.Router(),
    contacts = require( './contacts' ),
    groups = require( './groups' ),
    users = require( './users' ),
    products = require( './products' ),
    projects = require( './projects' );

router.use( '/users', users );
router.use( '/contacts', contacts );
router.use( '/groups', groups );
router.use( '/products', products );
router.use( '/projects', projects );


module.exports = router;
