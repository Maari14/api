import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async(req,res,next)=>{
  const { username, email, mobileNo, password, confirmPassword ,isAdmin} = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({
      username,
      email,
      mobileNo,
      password,
      isAdmin
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.json({ message: 'User registered successfully' });
  }catch (error) {
       next(error)
    }
}
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({username:req.body.username})
    if(!user) return res.status(404).send('user not found')
  const iscorrect = bcrypt.compareSync(req.body.password,user.password)
  if(!iscorrect) return res.status(404).send("password is incorrect")

  const token = jwt.sign(
    {
        id:user.id_,
        isAdmin:user.isAdmin,
    },process.env.KEY
  )
  const { password, ...info } = user._doc;
  res.cookie("accessToken", token, {
    httpOnly: true,
  }).status(200).send(info)
} catch (error) {
    next(error)
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};