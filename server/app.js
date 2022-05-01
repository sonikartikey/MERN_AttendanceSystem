const express = require('express');
const dotenv = require('dotenv')
require('./db/conn')
const User = require('./models/userSchema')

dotenv.config({ path: './config.env' })
const PORT = process.env.PORT || 5000;

const app = express();

//for postman requests
app.use(express.json())

const userRouter = require("./router/auth")
//3 : register a router 
app.use(userRouter)


app.get("/login", (req, res) => {
    res.send("hello I login")
})


app.listen(PORT, () => { console.log('connection success', PORT) })