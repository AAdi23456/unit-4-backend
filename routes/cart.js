const express=require("express")
const CartModel=require("../model/cart")
const CartRoute=express.Router()
const validate=require("../middleware/postmiddleware")
const cartmodel = require("../model/cart")


CartRoute.post("/add",validate,async(req,res)=>{
    try {
        const DataForCart=req.body
        console.log(DataForCart);
        if(DataForCart){
            const NewData=new CartModel(DataForCart)
          await NewData.save()
            res.status(200).json("Item added to the cart")
        }else{
            res.status(400).json("Please select the item first")
        }
      
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
   
})
CartRoute.get("/show",validate,async(req,res)=>{
    try {
        const {email}=req.body
        
        if(email){
            const CartData=await cartmodel.find({email})
         if(CartData){
            return res.status(200).json(CartData)
         }
            res.status(200).json("Your cart is empity")
        }else{
            res.status(400).json("Not Authorised")
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
   
})
CartRoute.get("/Remove/:id",validate,async(req,res)=>{
    try {
        const {id}=req.params
        
        if(id){
            const CartData = await cartmodel.findByIdAndDelete({id})
       return  res.status(200).json("Item removed from cart")
        }else{
            res.status(400).json("Please provide the id")
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
   
})
module.exports=CartRoute