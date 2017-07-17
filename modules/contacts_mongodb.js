/**
 * Created by Administrator on 2017/4/25.
 */

var mongoose = require( 'mongoose' ),
    Contact = require( './schema/contact' ),
    Grid = require('gridfs-stream'),
    fs = require( 'fs' ),
    Path = require( 'path' ),
    Streamifier = require( './streamifier' ),
    crispy = require( 'crispy-string' ),
    _ = require( 'underscore' ),
    helper = require( './http_helper' ),
    key = 'primarycontactnumber',
    AVATAR_PATH =   './avatar',
    ID_LENGTH = 10;


var db = mongoose.connect( 'mongodb://localhost/contacts', { useMongoClient: true } );

var mongodb = mongoose.connection;
Grid.mongo = mongoose.mongo;
var gfs = Grid(db);

module.exports.mongoose = mongoose;

module.exports.query = function ( number, res ) {
    "use strict";
     Contact.findOne( { primarycontactnumber : number }, function ( error, data ) {
         if ( error ) {
             helper.InternalServerError( res, error, { primarycontactnumber :  contact.primarycontactnumber } );
         }else {
             if ( ! data ) {
                 helper.ResourceNotFound( res , { primarycontactnumber : number });
             }else {
                 helper.ResourceFound( res, data );
             }
         }
     } );
};

module.exports.update = function ( contact, res ) {
    "use strict";
    var newcontact;
     Contact.findOne( { primarycontactnumber : contact.primarycontactnumber }, function ( error, data ) {
         if ( error ) {
             helper.InternalServerError( res, error, { primarycontactnumber :  contact.primarycontactnumber } );
         }else {
             newcontact = toNewContact( contact );
             if ( !data ) {
                 newcontact.save( function ( error ) {
                     if ( ! error ) {
                         newcontact.save();
                     }
                 } );
                 helper.ResourceCreated( res, newcontact );
             }else {
                 toExistContact( data, newcontact );
                 data.save( function ( error ) {
                     if ( ! error ) {
                         data.save();
                     }
                     helper.ResourceUpdated(res, data );
                 } );
             }
         }
     } );
}; 

function toExistContact( data, contact ) {
    "use strict";
    data.primarycontactnumber = contact.primarycontactnumber;
    data.name = contact.name;
    data.address = contact.address;
    data.birthdate = contact.birthdate;
    data.phones = contact.phones;
    data.emails = contact.emails;
    data.facebook = contact.facebook;
    data.twitter = contact.twitter;
    data.github = contact.github;
    data.google = contact.google;
    data.avatar = contact.avatar;
    data.portrait = contact.portrait;
}

function makeId() {
    return crispy.base32String(ID_LENGTH);
}

function toNewContact( body ) {
    "use strict";

    return new Contact(
        {
            primarycontactnumber : makeId(),
            name: body.name,
            address: body.address,
            birthdate: body.birthdate,
            phones: body.phones,
            emails: body.emails,
            facebook: body.facebook,
            twitter: body.twitter,
            github: body.github,
            google: body.google,
            avatar:body.avatar,
            portrait : body.portrait
        });
}

module.exports.remove = function ( number, res ) {
    "use strict";
    Contact.findOne( { primarycontactnumber : number }, function ( error, data ) {
         if ( error ) {
             helper.InternalServerError( res, error, { primarycontactnumber : number } );

         }else {
             if ( ! data ) {
                 helper.ResourceNotFound( res , { primarycontactnumber : number });
             }else {
                data.remove( function ( error ) {
                    if ( error ) {
                        helper.InternalServerError( res, error, { primarycontactnumber : number } );
                    }else {
                        data.remove();
                        helper.ResourceDeleted( res );
                    }
                } );
             }
         }
    } );
};

module.exports.query_by_arg = function ( arg, value, res ) {
    "use strict";
    var filter = {};
    if ( arg instanceof Array ) {
        arg.forEach( function ( a, index ) {
            filter[ a ] = value[ index ];
        })
    }else {
        filter[ arg ] = value;
    }
    Contact.find( filter, function ( error, data ) {
        if ( error ) {
            helper.InternalServerError( res, error, { arg : arg, value : value } );
        }else {
            if ( ! data ) {
                helper.ResourceNotFound( res, { arg : arg, value : value } );
            }else {
                helper.ResourceFound( res, data );
            }
        }
    });
};

module.exports.list = function ( res ) {
    "use strict";
    Contact.find( {}, function ( error, data ) {
        if ( error ) {
            helper.InternalServerError( res );
        }else {
            helper.ResourceFound( res, data );
        }
    } );
};

module.exports.paginate = function ( req, res ) {
    console.log( 'paginate' );
    Contact.paginate( {}
     ,{ page : req.query.page, limit : req.query.limit }
    , function ( error, data ) {
        if ( error ) {
            helper.InternalServerError( res );
        }else {
            helper.ResourceFound( res, {
                object : 'contacts',
                items_count : data.total,
                page_count : data.pages,
                item_count : data.limit,
                page_index : data.page,
                result : data.docs
            } );
        }
    }
    );
};

module.exports.deletePortrait = function (req, res, next) {
    var number = req.params.number;
    var filename = req.params.filename;
    gfs.exist({num: number, filename: filename}, function(err, found){
        if(err) return res.send("Error occured");
        if(found){
            gfs.remove({num: number, filename: filename}, function(err){
                if(err) return res.send("Error occured");
                helper.ResourceDeleted(res);
            });
        } else{
            res.send("No image found with that title");
        }
    });

   /* var collection = mongodb.collection('fs.files');
    collection.remove({num: number, filename: filename}, function (error, contact) {
        if (error) {
            console.log(error);
            return;
        }

        if (contact === null) {
            res.send('404', 'Not found');
            return;
        }
        else {
            console.log('Successfully deleted image for primary contact number: ' + number);
        }
    });

    res.send('Successfully deleted image for primary contact number: ' + number);*/
};

module.exports.getPortrait = function ( req, res, next ) {
    var number = req.params.number;
    var filename = req.params.filename;
    var imageStream = gfs.createReadStream({
        num : number,
        filename: filename,
        mode : 'r'
    });
    imageStream.on('error', function(error) {
        res.send('404', 'Not found');
        return;
    });
    res.setHeader('Content-Type', 'image/jpeg');
    imageStream.pipe(res);
};

module.exports.uploadPortrait = function ( req, res, next ) {
    var number = req.params.number,
        fileName, fullPath, metaData,
        extension, wstream;
    if ( !_.has( req, 'file' ) && !_.has( req, 'files' ) ) {
        return  helper.BadRequest( res, 'Please upload a file in the avatar field', '' );
    }
    metaData = req.files;
   /* metaData = req.files[0];
    var target = gfs.createWriteStream({
        _id : number,
        filename: metaData.originalname,
        mode: 'w'
    });
    target.write( metaData.buffer );
    target.end();
    helper.ResourceUpdated( res, { data : 'success' } );*/

    Contact.findOne( { primarycontactnumber : number }, function ( error, data ) {
        if ( error ) {
            helper.InternalServerError( res, 'contact not found', { primarycontactnumber : number } );
        }else {
            if ( ! data ) {
                helper.ResourceNotFound( res , { primarycontactnumber : number });
                return next();
            }else {

                if ( metaData && metaData.length > 0 ) {
                    data.portrait = data.portrait || [];
                    _.each( metaData, function ( file ) {
                        if ( isValidImage(file.mimetype) ) {
                            var ffn = generateRandomName(30);
                            var target = gfs.createWriteStream({
                                num : number,
                                filename: ffn,
                                mode: 'w'
                            });
                            data.portrait.push( 'api/v1/contacts/' + number + '/' + ffn +  '/portrait' );
                            target.write( file.buffer );
                            target.end();

                        }
                    } );
                }
                data.save( function ( error ) {
                    if ( ! error ) {
                        data.save();
                    }
                    helper.ResourceUpdated( res, data );
                } );
            }
        }
    } );
};

module.exports.uploadAvatar = function ( req, res, next ) {
    var number = req.params.number,
        fileName, fullPath, metaData,
        extension, wstream;
    if ( !_.has( req, 'file' ) && !_.has( req, 'files' ) ) {
      return  helper.BadRequest( res, 'Please upload a file in the avatar field', '' );
    }
    metaData = req.files;
    if ( metaData && metaData.length > 0 ) {
        metaData = metaData[0];
    }
    if ( ! isValidImage(metaData.mimetype) ) {
        helper.BadRequest( res, 'Invalid format, please use png,jpg or gif file', '' );
        return next();
    }
    Contact.findOne( { primarycontactnumber : number }, function ( error, data ) {
        if ( error ) {
            helper.InternalServerError( res, 'contact not found', { primarycontactnumber : number } );
        }else {
            if ( ! data ) {
                helper.ResourceNotFound( res , { primarycontactnumber : number });
                return next();
            }else {
                if ( ! fs.existsSync( AVATAR_PATH ) ) {
                    fs.mkdirSync( AVATAR_PATH );
                }
                extension =getExtension( metaData.originalname );

                console.log( 'AVATAR_PATH', process.cwd() );
               // fileName = metaData.filename;
                do {
                    fileName = generateFileName( 25, extension );
                    fullPath = generateFullPath( fileName );
                } while( fs.existsSync( fullPath ) )
                removeAvatar( data );
                wstream = fs.createWriteStream( fullPath );


                wstream.write( metaData.buffer );
                wstream.end();

                data.avatar = {
                    file : fileName,
                    url :  generateURLForAvatar( fileName)
                };
                data.save( function ( error ) {
                    if ( ! error ) {
                        data.save();
                    }
                    helper.ResourceUpdated( res, data );
                } );
            }
        }
    } );
};

function isValidImage( mimetype ) {
    return /jpeg|png|gif/.test(mimetype);
}

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
    return AVATAR_PATH + '/' + filename
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
    return 'avatar/' + filename
}

/*function generateURLForAvatar(filename) {
    return 'http://localhost:3000/avatar/' + filename;
}*/









