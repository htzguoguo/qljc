/**
 * Created by Administrator on 2017/7/25.
 */

var _ = require( 'underscore' );

module.exports.uploadfiles =  function ( imageBlob, options ) {
    var formData = new FormData(),
        ajaxOptions = {
            url : 'api/v1/files/upload',
            type : 'POST',
            data : formData,
            cache : false,
            contentType : false,
            processData : false
        };
    formData.append( 'files', imageBlob );
    options = options || {};
    _.extend( ajaxOptions, _.pick( options, 'success', 'error' ) );
    if ( options.progress ) {
        ajaxOptions.xhr = function () {
            var xhr = $.ajaxSettings.xhr();
            if ( xhr.upload ) {
                xhr.upload.addEventListener( 'progress', function ( event ) {
                    var length = event.length,
                        uploaded = event.loaded,
                        precent = uploaded / length;
                    options.progress( length, uploaded, precent );
                }, false );
            }
            return xhr;
        };
    }
    $.ajax( ajaxOptions );
};


