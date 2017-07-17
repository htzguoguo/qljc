/**
 * Created by Administrator on 2017/5/21.
 */

var Backbone = require( 'backbone' ),
    _ = require( 'underscore' ),
    Contact;

Contact = module.exports = Backbone.Model.extend(
    {
        urlRoot : 'api/v1/contacts',
        idAttribute: 'primarycontactnumber',
        defaults : {
            name: '',
            phone: '',
            email: '',
            address: '',
            facebook: '',
            twitter: '',
            google: '',
            github: '',
            avatar : null
        },
        toJSON : function () {
            var result = Backbone.Model.prototype.toJSON.call( this );
            if ( result.phones && result.phones.length > 0 ) {
                result.phone = result.phones[ 0 ].phone;
            }
            if ( result.emails && result.emails.length > 0 ) {
                result.email = result.emails[ 0 ].email;
            }
            return result;
        },
        validation : {
            name : {
                required : true,
                minLength : 3
            }
        },
        uploadAvatar : function ( imageBlob, options ) {
            console.log( this );
            var formData = new FormData(),
                ajaxOptions = {
                    url : 'api/v1/contacts/' + this.get( this.idAttribute ) + "/avatar",
                    type : 'POST',
                    data : formData,
                    cache : false,
                    contentType : false,
                    processData : false
                };


            formData.append( 'avatar', imageBlob );
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

        }
        /*validate : function ( attrs ) {
            if ( _.isEmpty( attrs.name ) ) {
                return {
                    attr : 'name',
                    message : 'name is required'
                }
            }
        }*/
    }
);