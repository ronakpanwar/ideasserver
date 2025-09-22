const Message = require("../models/message");

const sendMessage = async(req,res)=>{
    try {
        
        const userId = req.params.id;
        const {email , msg} = req.body;
        if(!email || !msg){
            return res.status(404).json({
                success:false,
                message:"Somthing missing..."
            })
        }

        await Message.create({
            userId,
            email,
            msg
        })
        

        return res.status(201).json({
            success:true,
            message:"MEssage send SuccessFully..."
        })

    } catch (error) {
        console.log(error)
        return  res.status(404).json({
            message:error
        })
    }
}


const getMyMessage = async(req,res)=>{
    try {

        const userId = req.id;

        const message = await Message.find({userId});

        return res.status(200).json({
            success:true,
            message
        })
        
    } catch (error) {
        console.log(error)
        return  res.status(404).json({
            message:error
        })
    }
}

module.exports = {
    sendMessage,
    getMyMessage
}