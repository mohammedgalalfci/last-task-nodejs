const express = require("express")
const {User}=require('../models/user')
const mongoose=require('mongoose')
const joi=require('joi')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const router=express.Router()

const loginSchema=joi.object({
    email:joi.string().required(),
    password:joi.string().min(8).max(20).required()
})
const validateLogin=(user)=>{
    return loginSchema.validate(user)
}
router.post('/login',async(req,res)=>{
    const {error}=validateLogin(req.body)
    if(error) return res.status(400).json({message:error.details[0].message})
    const _user=await User.findOne({email: req.body.email})
    if(!_user) return res.status(401).json({message:'Email or password incorrect'})
    const validePassword=await bcrypt.compare(req.body.password,_user.password)
    if(!validePassword) return res.status(401).json({message:'Email or password incorrect'})
    
    const token=jwt.sign({_id:_user._id},process.env.secretKy)
    res.json(_user)
})

module.exports=router