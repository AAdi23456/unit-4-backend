const express = require("express")
const Authorization = express.Router()
const bcrypt = require("bcrypt")
const reg_model = require("../model/reg")

const jwt = require("jsonwebtoken")

Authorization.post("/signup", async (req, res) => {
  const { name, email, password } = req.body
  console.log(req.body);
  try {
    const userr=await reg_model.findOne({email})
    console.log(userr);
    if(userr){
      return res.status(200).json({msg:"user already exist"})
    }
    bcrypt.hash(password, 8, async (err, hash) => {
      const datatodb = new reg_model({ name, email, password: hash })
      await datatodb.save()
      res.json({msg:"regestration success"})
      console.log(err);
    })

  } catch (error) {
    console.log(error)
    res.json("failed")
  }
})
  ;
Authorization.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await reg_model.findOne({ email })
    console.log(user);
    if(!user){
      return res.status(200).json({"msg": "Please regeister first"} )
    }
    
      bcrypt.compare(password, user.password, (err, result) => {
        console.log(err);
        console.log(password);

        if (err) {
         return res.status(400).json({ "msg": "Wrong Credentials" })
        
        }
        return  res.status(200).json({ "msg": "Login successfull!", "token": jwt.sign({ "email": user.email }, "masai"),"name":user.name})
      });
    
    
  } catch (err) {
    res.status(400).json({ "msg": err.message })
    
  }
})



module.exports =  Authorization


