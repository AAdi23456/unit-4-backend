const express=require("express")
const jwt=require("jsonwebtoken")

const Validate=(req,res,next)=>{
    try {
        const token=req.headers.token
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
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
   
  
}


module.exports=Validate