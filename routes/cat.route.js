import express from 'express'
import { verifyToken } from '../middleware/jwt.js'
import { createGig, deleteGig, getGig, getGigs } from '../controllers/gig.controller.js';
import { addcat, deletecat, getcat } from '../controllers/cat.controller.js';


const router = express.Router()

router.post("/", addcat);
router.delete("/:id", deletecat);
router.get("/", getcat);

export default router