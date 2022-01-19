const jwt=require('jsonwebtoken')
const auth=(req,res,next)=>{
    try{
        const user=jwt.verify(req.header('x'),process.env.secretKy)
        req.user=user
        next()
    }catch(error){
        res.status(401).json({message:'unauthorized'})
    }
}
module.exports=auth