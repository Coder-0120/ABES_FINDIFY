const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [
            /^[a-z]+\.[0-9a-z]+@abes\.ac\.in$/,
            'Email must follow format: name.rollno@abes.ac.in',
        ],
    },
    password:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("User",userSchema);
