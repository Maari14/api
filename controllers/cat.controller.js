
import { v1 }from 'uuid'
import Cat from '../models/cat.model.js';

export const addcat = async (req, res, next) => {
  
  
    const userId = v1();
    const newcat = new Cat({
      userId,
      ...req.body,
    });
  
    try {
      const savedcat = await newcat.save();
      res.status(201).json(savedcat);
    } catch (err) {
      next(err);
    }
  };

export const deletecat = async (req,res,next)=>{

try {
    const cat = await Cat.findById(req.params.id);
    
    await Cat.findByIdAndDelete(req.params.id)
    res.status(201).send("deleted successfully")
} catch (err) {
    next(err)
}
}

export const getcat = async(req,res,next)=>{

    try {
        const cat = await Cat.find()
        
       res.status(201).send(cat)
    } catch (err) {
       next(err) 
    }
    
}

