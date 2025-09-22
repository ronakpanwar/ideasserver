const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudindury');
const getDataUri = require('../utils/datauri')


const signUp = async(req,res)=>{
    try {
        const {name , userName , email , password }= req.body;
        if(!name || !userName || !email ||!password){
            return res.status(404).json({
                success:false,
                message:"Somthing missing..."
            })
        } 

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"You have already account..."
            })
        }

        const hashPassword = await bcrypt.hash(password,10);

        await User.create({
            name,
            userName,
            email,
            password:hashPassword
        })

        return res.status(201).json({
            success:true,
            message:"Account created succesfully..."
        })
        
    } catch (error) {
        console.log(error)
        return  res.status(404).json({
            message:error
        })
        
    }
}

const signIn = async(req,res)=>{
    try {
          const {email , password } = req.body;
          if( !email || !password){
            return res.status(404).json({
                success:false,
                message:"Somthing missing..."
            })
           } 

          let user = await User.findOne({email});
          if(!user){
            return res.status(404).json({
                success:false,
                message:"Enter Correct Email..."
            })
          }

          const cheakPassword = await bcrypt.compare( password , user.password);
          if(!cheakPassword){
            return res.status(404).json({
                success:false,
                message:"Password is Incorrect..."
            })
          }

          const Token = {
            id : user._id
          }

          user = {
           _id:user._id,
           name:user.name,
           userName:user.userName,
           email:user.email,
           profile:user.profile,
          }
          
 
          const token = jwt.sign(Token , process.env.SECRET_KEY , { expiresIn:'1d'});

          return res.status(200).cookie('token',token ,  {maxAge:1*24*60*60*1000 , sameSite:'strict'}).json({
            success:true,
            user,
            message:`Welcome back ${user.name}`
          })

        
    } catch (error) {
        console.log(error)
        return  res.status(404).json({
            message:error
        })
    }
} 

const getUserById = async(req, res)=>{
    try {
        const id  = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return  res.status(404).json({
                message:"User not exist...",
                success:false
            })
        }

        return res.status(200).json({
            success:true,
            user,
        })
        
    } catch (error) {
        console.log(error)
        return  res.status(404).json({
            message:error
        })
    }
}

const updateProfile  = async(req,res)=>{
    try {

        const {userName , bio , linkdinId , instaId , gitId ,twitterId} = req.body;
        const userId = req.id;
        if(!userId){
            return  res.status(404).json({
                message:"User not Autherized...",
                success:false
            })
        }

        const file = req.file;
        const fileUrl = getDataUri(file)
        const cloudresponse = await cloudinary.uploader.upload(fileUrl.content)

        let user = await User.findById(userId);
        
        if(!user){
            return  res.status(404).json({
                message:"User not autharized...",
                success:false
            })
        }

        if(userName) user.userName = userName;
        if(bio) user.profile.bio = bio;
        if(linkdinId) user.profile.linkdinId  = linkdinId;
        if(instaId) user.profile.instaId = instaId;
        if(twitterId) user.profile.twitterId = twitterId;
        if(gitId) user.profile.gitId = gitId;
        if(file) user.profile.img = cloudresponse.secure_url;

        await user.save();

        return res.status(200).json({
            success:true,
            user,
            message:"Profile update successfully..."
        })
        
    } catch (error) {
        console.log(error)
        return  res.status(404).json({
            message:error
        })
    }
}

const logOut = (req,res)=>{
    try {
        return res.status(200).cookie('token' ,'' ,{maxAge:0}).json({
           message:'You Logged Out Successfully..',
           success:true
        })

   } catch (error) {
       console.log(error) 
   }
}


module.exports = {
    signUp,
    signIn,
    getUserById,
    updateProfile,
    logOut
}