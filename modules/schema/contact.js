/**
 * Created by Administrator on 2017/4/25.
 */

var mongoose = require( 'mongoose' ),
    mongoosePaginate = require( 'mongoose-paginate' ),
    contactSchema = new mongoose.Schema( {
        primarycontactnumber : {
            type : String,
            index : {
                unique : true
            }
        },
        name : String,
        address : String,
        birthdate : Date,
        phones : [
            {
                description : String,
                phone : String
             }
             ],
        emails: [
            {
                description : String,
                email : String
            }
        ],
        facebook: String,
        twitter: String,
        github: String,
        google: String,
        avatar : {
            file : String,
            url : String
        },
        portrait : []
    } );

contactSchema.plugin( mongoosePaginate );

var   Contact = mongoose.model( 'Contact', contactSchema );

module.exports = Contact;
