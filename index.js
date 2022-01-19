require('dotenv').config({path:".env"})
const express=require('express')
const mongoose=require('mongoose')
const app=express()
const userRouter=require('./Routes/user')
const authRouter = require('./Routes/auth')
const { path } = require('express/lib/application')
app.use(express.json())
app.use('/user',userRouter)
app.use('/auth',authRouter)
mongoose.connect(process.env.DB).then(()=>{
    app.listen(3000,()=>{
        console.log('server running')
    })
    console.log('connected to DB')
}).catch(()=>{
    console.log('error in connection')
})