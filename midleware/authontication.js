const jwt = require('jsonwebtoken');


const Authenticate = async(req,res,next)=>{
    try {
        const token = await req.cookies.token;
        if(!token){
            return res.status(404).json({
                success:false,
                message:"User not autherized..."
            })
        }

        const isCheck = jwt.verify(token , process.env.SECRET_KEY);
        if(!isCheck){
            return res.status(404).json({
                success:false,
                message:"User not autherized..."
            })
        }

        req.id = isCheck.id;
        next();

    } catch (error) {
        console.log(error)
    }
}

module.exports ={ Authenticate };