const mongoose = require('mongoose');


const idSchema = mongoose.Schema({
    id : {
        type : String,
        trim : true,
        lowercase : true,
        required : true
    },
    password : {
        type : String, 
        trim : true,
        lowercase : true,
        required : true
    }
});

const ID = mongoose.model('ID', idSchema)
 
module.exports = ID