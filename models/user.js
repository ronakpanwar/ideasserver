
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String ,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        bio:{
            type:String
        },
        img:{
            type:String
        },
        instaId:{
            type:String
        },
        linkdinId:{
            type:String
        },
        twitterId:{
            type:String
        },
        gitId:{
            type:String
        }
    }
},{timestamps:true});

const User = mongoose.model('User' , userSchema);

module.exports = User;