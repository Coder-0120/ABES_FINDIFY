const express= require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB=require("./config/db");
const UserRoute = require('./routes/UserRoute');
const LostRoute = require('./routes/LostRoute');
const FoundRoute = require('./routes/FoundRoute');
const UserPostsRoute = require('./routes/Userposts');
const claimRoutes = require("./routes/claims");
const claimMineRoutes = require("./routes/claimMineRoute");
const userAlertRoute=require("./routes/userAlertRoute");


dotenv.config();
app.use(express.json());
connectDB();
const cors = require('cors');
app.use(cors());
app.use("/api/users", UserRoute); // login and register
app.use("/api/lost", LostRoute);  // report lost items and get all lost items..delete
app.use("/api/found", FoundRoute); // report found items and get all found items..delete
app.use("/api/user/view", UserPostsRoute); // view user's posts (lost and found items)
app.use("/api/claims", claimRoutes);
app.use("/api/claimMine", claimMineRoutes);
app.use("/api/viewall",userAlertRoute);


app.get("/",(req,res)=>{
    res.send("Welcome to ABES Backend");
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})