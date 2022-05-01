const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
const DB = process.env.DATABASE

mongoose.connect(DB).then(()=>{
    console.log("connection to DB is successfully")
}).catch((err)=>{console.log("Falied to connect")})
