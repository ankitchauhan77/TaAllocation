const mongoose = require('mongoose');


const courseSchema = mongoose.Schema({
    courseCode : {
        type : String,
        trim : true,
        required : true
    },
    ugPg : {
        type : String, 
        trim : true,
        required : true
    },
    electiveCore : {
        type : String,
        trim : true,
        required : true
    },
    needToAttend : {
        type : Number,
        default : 1,
        validate(value) {
            if (value < 0) {
                throw new Error('age must be positive');
            }
        }
    }
});

const COURSE = mongoose.model('COURSE', courseSchema)
 
module.exports = COURSE