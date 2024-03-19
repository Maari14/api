import Gig from "../models/gig.model.js"
import createError from "../utils/createError.js"
import { v1 }from 'uuid'

export const createGig = async (req, res, next) => {
  
  
    const userId = v1();
    const newGig = new Gig({
      userId,
      ...req.body,
    });
  
    try {
      const savedGig = await newGig.save();
      res.status(201).json(savedGig);
    } catch (err) {
      next(err);
    }
  };

export const deleteGig = async (req,res,next)=>{

try {
    const gig = await Gig.findById(req.params.id);
    
    await Gig.findByIdAndDelete(req.params.id)
    res.status(201).send("deleted successfully")
} catch (err) {
    next(err)
}
}

export const getGig = async(req,res,next)=>{

    try {
        const gig = await Gig.findById(req.params.id)
        if(!gig) 
        return next(403," gig not found") 
       res.status(201).send(gig)
    } catch (err) {
       next(err) 
    }
    
}

export const getGigs = async(req,res,next)=>{
    
    const q = req.query
    const filters={
       ...(q.userId && {userId:q.userId}),
       ...(q.cat && {cat:q.cat}),
       ...((q.max || q.min) && {
             price:{...(q.min && { $gt: q.min }),
             ...(q.max && { $lt: q.max }),}
             }
             ),
       ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    }
    try {
       const gigs = await Gig.find(filters).sort({ [q.sort]: -1 }); 
       res.status(200).send(gigs)
    } catch (err) {
        next(err)
    }
}