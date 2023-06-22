const express=require("express")
const jwt=require("jsonwebtoken")

const Validate=(req,res,next)=>{
    const token=req.body.token
    console.log(token);
    if(token){
        const decoded=jwt.verify(token,"masai")
        console.log(decoded);
        req.body.email=decoded.email
        req.body.token=""
            next()
        } else {
            res.status(400).json({"msg":"Please Login First"})
        }
  
}


module.exports=Validate