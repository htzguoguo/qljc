/**
 * Created by Administrator on 2017/7/25.
 */

var express = require( 'express' ),
    router = express.Router(),
    multer = require( 'multer' ),
    Upload_Files = require( '../modules/upload_files' ),
    upload;

upload = multer();
router.post( '/upload', upload.array( 'files',12), function ( req, res, next ) {
    Upload_Files.uploadFiles( req, res, next );
} );

module.exports = router;
