const mongoose=require('mongoose')
const joi=require('joi')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})

const validateSchema=joi.object({
    username:joi.string().min(3).max(20).required(),
    email:joi.string().required(),
    password:joi.string().min(8).max(20).required()
})

const validateUser=(user)=>{
    return validateSchema.validate(user)
}
const User=mongoose.model('user',userSchema)
module.exports={User,validateUser}