import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    
    
    
    price: {
      type: Number,
      required: true,
    },
    
    
    cat: {
      type: String,
      required: true,
    },
    
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gig", GigSchema);