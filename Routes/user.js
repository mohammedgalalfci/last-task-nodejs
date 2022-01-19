const express=require('express')
const bcrypt=require('bcrypt')
const {User,validateUser}=require('../models/user')
const auth=require('../middleware/index')
const router=express.Router()

router.post('/add',async (req,res)=>{
    const {error}=validateUser(req.body)
    if(error) return res.status(400).json({message:error.details[0].message})
    const _user=await User.findOne({email:req.body.email})
    if(_user) return res.status(400).json({message:"This is email has been registered"})
    const password=await bcrypt.hash(req.body.password,10)
    const addUser=new User({...req.body,password})
    await addUser.save()
    res.json({
        username:addUser.username,
        email:addUser.email,
        _id:addUser._id
    })
})

router.get('/show',async(req,res)=>{
    const users=await User.find()
    res.json(users)
})

router.get('/find/:id',async(req,res)=>{
    const id=req.params.id
    const user=await User.findById(id)
    if(!user) return res.status(404).json({message:"Not found user"})
    res.json({
        username:user.username,
        email:user.email,
        _id:user._id
    })
})

router.put('/edit/:id',auth,async(req,res)=>{
    const {error}=validateUser(req.body)
    if(error) return res.status(400).json({message:error.details[0].message})
    const id=req.params.id
    const user=await User.findById(id)
    if(!user) return res.status(404).json({message:"Not found user"})
    const {username,email,password}=req.body
    user.username=username
    user.email=email
    user.password=password
    await user.save()
    res.json({
        username:user.username,
        email:user.email,
        _id:user._id
    })
})

router.delete('/delete/:id',auth,async(req,res)=>{
    const id=req.params.id
    const user=await User.findByIdAndDelete(id)
    if(!user) return res.status(404).json({message:"Not found user"})
    res.json({
        username:user.username,
        email:user.email,
        _id:user._id
    })
})
module.exports=router