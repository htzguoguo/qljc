/**
 * Created by Administrator on 2017/4/11.
 */

var express = require( 'express' ),
    router = express.Router(),
    contacts = require( './contacts' ),
    groups = require( './groups' ),
    users = require( './users' ),
    products = require( './products' ),
    projects = require( './projects' ),
    bridges = require( './bridges' ),
    tasks = require( './task' ),
    files = require( './files' );


router.use( '/users', users );
router.use( '/contacts', contacts );
router.use( '/groups', groups );
router.use( '/products', products );
router.use( '/projects', projects );
router.use( '/bridges', bridges );
router.use( '/tasks', tasks );
router.use(  '/files', files  );


module.exports = router;
