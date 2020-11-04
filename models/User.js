const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    },
    isMale : {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model(`users`, UserSchema)