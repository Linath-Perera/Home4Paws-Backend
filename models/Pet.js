const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male','Female'],
       // required: true
    },
    status: {
        type: String,
        enum: ['Available','Adopted'],
        default: 'Available'
    },
    description: {
        type: String,
        //required: true
    }
}, {  
        timestamps: true 
    

});
module.exports = mongoose.model('Pet', PetSchema);