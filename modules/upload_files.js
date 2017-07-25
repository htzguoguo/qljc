/**
 * Created by Administrator on 2017/7/25.
 */

var
    fs = require( 'fs' ),
    Path = require( 'path' ),
    crispy = require( 'crispy-string' ),
    _ = require( 'underscore' ),
    helper = require( './http_helper' ),
    _PATH =   './upload';

module.exports.uploadFiles = function ( req, res, next ) {
    var
        fileName, fullPath, metaData,
        extension, wstream, result = [];
    if ( !_.has( req, 'file' ) && !_.has( req, 'files' ) ) {
        return  helper.BadRequest( res, '没有上传文件', '' );
    }
    metaData = req.files;
    if ( req.files && req.files.length > 0 ) {
        if ( ! fs.existsSync( _PATH ) ) {
            fs.mkdirSync( _PATH );
        }

        req.files.forEach( function ( file ) {
            metaData = file;
            extension =getExtension( metaData.originalname );

            do {
                fileName = generateFileName( 25, extension );
                fullPath = generateFullPath( fileName );
            } while( fs.existsSync( fullPath ) );

            // delete file if exist
            if ( fs.existsSync( fullPath ) ) {
                fs.unlinkSync( fullPath );
            }
            // save file
            wstream = fs.createWriteStream( fullPath );
            wstream.write( metaData.buffer );
            wstream.end();
            result.push( generateURLForAvatar( fileName) );
        } );

    }
    helper.ResourceFound( res, result );
};


function getExtension( filename ) {
    return Path.extname( filename );
}

function generateRandomName( len ) {
    return crispy.base32String(len);
}

function generateFileName(len,  extension ) {
    return crispy.base32String(len) + extension;
}

function generateFullPath( filename ) {
    return _PATH + '/' + filename
}

function removeAvatar( contact ) {
    var currentAvatarPath;
    if ( _.has( contact, 'avatar.file' ) ) {
        currentAvatarPath = generateFullPath( contact.avatar.file );
        if ( fs.existsSync( currentAvatarPath ) ) {
            fs.unlinkSync( currentAvatarPath );
        }
    }
}

function generateURLForAvatar( filename ) {
    return 'files/' + filename
}
