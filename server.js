import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './routes/auth.route.js'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import gigRoute from './routes/gig.route.js'
import catRoute from './routes/cat.route.js'


dotenv.config()

const app=express()

const connect = async()=>{
try{
   await mongoose.connect(process.env.MONGO)
   console.log("db connected")  
}
   catch(er){
    console.log(er)
  }
}

app.use(cookieParser());
app.use(express.json())
app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true }))

app.use("/api/auth",authRoute)
app.use("/api/gig",gigRoute)
app.use('/api/cat',catRoute)



app.listen(9900,()=>{
    connect()
    console.log("port is running")
})