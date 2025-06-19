const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post("/register",async(req,res)=>{
    const {name,email,password,confirmPassword} = req.body;

    if(!name || !email || !password || !confirmPassword){
        res.status(400).json({
            error:"Please fill all the fields"
        });
    }
    if(password !=confirmPassword){
        res.status(400).json({
            error:"Passwords do not match"
        });
    }
    const testabesemail= /^[a-z]+\.[0-9a-z]+@abes\.ac\.in$/;
    if(testabesemail.test(email)==false){
        res.status(400).json({
            error:"Use your Official ABES Email"
        });
    }

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                error:"User already registered with this email"
            })
        }
        const hashpassword= await bcrypt.hash(password,10);
        const newuser= new User({
            name,
            email,
            password:hashpassword
        });
        await newuser.save();
        res.status(201).json({
            message:"User registered successfully"
        })


    }
    catch(error){
        return res.status(400).json({
            error:"Something went wrong while registering the user\n Try again later"
        })
    }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please enter all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }
      res.status(200).json({
      message: "Login successful",
      user: {
        email,
        password
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
