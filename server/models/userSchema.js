const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    markedDates: [{
        name: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true
        },
      
        phone: {
          type: Number,
          required: true
        },
        markedDate: {
          type: String,
          required: true
        }
      }],
    
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

})


//genrating JWT 
userSchema.methods.generateAuthToken = async function () {
    try {
      const generated_token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY)
      this.tokens = this.tokens.concat({ token: generated_token })
      await this.save()
      return generated_token
    } 
    catch (error) {
    }
  }

//Hashing the password here
// to check pre condition for bcytppt  ,, this is middleware using bcrypt
userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
        this.cpassword = await bcrypt.hash(this.password, 10)
    }
    next();
})

userSchema.methods.addmarkedDate = async function (name, email , phone , markedDate) {
    try {
     
      this.markedDates = this.markedDates.concat({ name, email , phone , markedDate })
      await this.save()
      return this.markedDate
  
    } catch (error) {
      res.send(error)
    }
  }
  

const User = new mongoose.model("USER", userSchema);

module.exports = User;