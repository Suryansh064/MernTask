import express from "express";
import User from "../models/user.js";
const router = express.Router();
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
router.post("/Signup",async (req,res)=>{
    const {username,email , password} = req.body;

    try {
        if(!email || !password ||  !username) {
            return res.status(400).json({ message :"All Fields are Required"});
    }

    const existUser = await User.findOne({username}) ;
    if(existUser) {
        return res.status(400).json({message:"Username Already Exist"});
    }
    else if(username.length<5) {
        return res.status(400).json({message:"Username Should have atleast 5 Chars"});
    }

    const existEmail = await User.findOne({email}) ;
    if(existEmail) {
        return res.status(400).json({message:"Email Already Exist"});
        }


    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser =  new User({
        username :username,
        email :email,
        password:hashedPassword,
    })
    await  newUser.save();
    return res.status(200).json({message:"Signin Successfully"});
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"Internal Server Error"});
    }
})

router.post("/Login", async (req,res)=>{
    const {username,email , password} = req.body;
    try {
        if( !password ||  !username) {
            return res.status(400).json({ message :"All Fields are Required"});
    }

    const existUser = await User.findOne({username}) ;
    if(!existUser) {
        return res.status(400).json({message:"Username or Password is Incorrect"});
    }
    bcrypt.compare(password , existUser.password,(err,data)=>{
        if(data){
        const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET, { expiresIn: "2d" });
        return res.status(200).json({ id: existUser._id, token: token });
        }
        else {
            return res.status(400).json({message:"Username or Password is Incorrect"});
        }
    })
}
    catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
})


export default router;