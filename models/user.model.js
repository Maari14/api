import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    
  },
  mobileNo: {
    type: String,
    required: true,
   
  },
  password: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    default:false
  },
},{
  timestamps:true


})
export default mongoose.model("user",userSchema)