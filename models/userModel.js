const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({     //Create a schema
    name: { 
        type: String, 
        required: [true, 'Please enter your name'] 
    },
    email: {
        type: String, 
        required: [true, 'Please enter your email'], 
        unique: true
    },
    password: { 
        type: String, 
        required: [true, 'Please enter your password'] 
    },
},
{
    timestamps: true //Automatically create fields createdAt and updatedAt
});

module.exports = mongoose.model('Users', userSchema); //Export the model