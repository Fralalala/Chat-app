const mongoose = require("mongoose")

const MessageSchema = mongoose.Schema({
    msg : {
        type: String,
        required : true
    },
    date : {
        type: Date,
        default: Date.now
    },
    senderId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('messages', MessageSchema)