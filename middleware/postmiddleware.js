const express=require("express")
const jwt=require("jsonwebtoken")

const Validate=(req,res,next)=>{
    const token=req.headers.authorization
    console.log(token);
    if(token){
        const decoded=jwt.verify(token,"masai")
            next()
        } else {
            res.status(400).json({"msg":"Please Login First"})
        }
  
}


module.exports=Validate