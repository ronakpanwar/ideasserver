const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    email:{
        type:String ,
        required:true
    },
    msg:{
        type:String,
        required:true
    }
}, {timestamps:true});

const Message = mongoose.model('Message' , messageSchema);

module.exports = Message;
