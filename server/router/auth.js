const express = require('express');
const router = new express.Router();
const User = require("../models/userSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser")
const authenticate = require('../authenticate/authenticate')

router.use(cookieParser())



router.get('/', (req, res) => {
  res.send("hello i ma in touter home page")
})


router.post("/register", async (req, res) => {
  const { name, email, gender, course, phone, password, cpassword } = req.body
  if (!name || !email || !phone || !password || !cpassword || !gender || !course) {
    return res.status(422).send("All field must be Filled")
  }

  try {
    const userExist = await User.findOne({ email: email })
    if (userExist) {
      return res.status(422).send("User Already Exists")
    }
    else if (password !== cpassword) {
      return res.status(422).send("Paswords are Not Matching")
    }
    else {
      const user = new User(req.body)
      //to use middle ware in userSchema
      await user.save();

      res.status(201).send("User Added")
    }
  }
  catch (err) {
  }
})

//login route


//Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    if (!password || !email) {
      return res.status(400).send("Please fill the data")
    }
    const userLogin = await User.findOne({ email: email })

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password)

      if (!isMatch) {
        res.status(400).send("Password Not Match")
      }
      else {
        const token = await userLogin.generateAuthToken();
        //to save cookies
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 285000000),
          httpOnly: true
        })
        res.status(200).send("Successful Login")
      }
    } else {
      res.status(400).send("Email Id NOT registered")
    }
  }
  catch (err) {
  }
})

//get data for contact
router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser)
})



//contact markedDate page 
router.post("/mark_attendance", authenticate, async (req, res) => {
  try {
    const { name, email, phone, markedDate } = req.body
    if (!name || !email || !phone || !markedDate) {
      return res.status(400).send("Please Mark the Attendance then submit")
    }
    const userDetail = await User.findOne({ _id: req.userId })
    if (userDetail) {

      const usermarkedDate = await userDetail.addmarkedDate(name, email, phone, markedDate)

      await userDetail.save()
      res.status(200).json({ markedDate: "user contact markedDate" })
    }
  }

  catch (err) {
  }
})

//get data for contact
router.get("/logout", (req, res) => {
  res.clearCookie('jwt', { path: "/" });
  res.status(200).send('user Logout')
})




module.exports = router