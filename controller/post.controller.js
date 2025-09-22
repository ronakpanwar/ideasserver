const Post = require('../models/posts');
const { findById } = require('../models/user');
const cloudinary = require('../utils/cloudindury');
const getDataUri = require('../utils/datauri')


const addPost = async(req,res)=>{
    try {
        const userId = req.id;
        const {title , description , problem , solution , targetAudience , field} = req.body;
       
        if(!title  || !description || !problem || !solution  || !targetAudience || !field){
            return res.status(401).json({
                success:false,
                message:"somthing is missing.."
            })
        }
        
            // const file = req.file;
            // const fileUrl = getDataUri(file)
            // const cloudresponse = await cloudinary.uploader.upload(fileUrl.content)

     
       await Post.create({
            userId,     
            title,
            description,
            problem,
            solution,
            targetAudience:targetAudience.split(","),
            field,
            
        });
        

        return res.status(201).json({
            success:true,
            message:"Post created succesfully..."
        });

    } catch (error) {
        console.log(error)
        return  res.status(404).json({
            message:error
        })
    }
}


const allPosts = async(req,res)=>{
    try {

        const posts = await Post.find().populate({path:'userId'});
        return res.status(200).json({
            success:true,
            posts
        })
        
    } catch (error) {
        console.log(error)
        return  res.status(404).json({
            message:error
        })
    }
}

const userPosts = async(req,res)=>{
    try {
        const userId = req.id;
        
        const posts = await Post.find({userId:userId});
        if(!posts){
            return res.status(400).json({
    
                message:"No Posts here..."
            })
        }

        return res.status(200).json({
           success:true,
            posts,
        })
        
    } catch (error) {
        console.log(error)
        return  res.status(404).json({
            message:error
        })
    }
}

const postById = async(req,res)=>{
    try {

        const postId = req.params.id;
        
        const post = await Post.findById(postId).populate({path:'userId'});

        if(!post){
            return res.status(400).json({
                message:"Post not found..."
            })
        }

        return res.status(200).json({
            success:true,
            post  
        })
        
    } catch (error) {
        console.log(error)
        return  res.status(404).json({
            message:error
        })
    }
}


module.exports = {
    addPost,
    allPosts,
    userPosts,
    postById
}