const mongoose = require('mongoose');

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.mongoDBURI);
        console.log("Mongodb connected succesfully");
    }
    catch(error){
        console.error("error in connecting to mongodb",error);
        process.exit(1); // used to Exit the process with failure
    }
}
module.exports = connectDB;