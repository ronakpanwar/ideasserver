const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    img:{
        type:String,
       
    },
    field:{
        type:String ,
    }
    ,
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    problem:{
        type:String,
        required:true,
    },
    solution:{
        type:String,
        required:true,
    }, 
    vision:{
        type:String
        
    },
    targetAudience:[{
        type:String,
        required:true,
    }],
    views:{
        type:Number,
    }, 
  
    
}, {timestamps:true});

const Post = mongoose.model('Post' , postSchema);

module.exports = Post;