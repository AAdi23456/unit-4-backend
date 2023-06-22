const express = require("express")
const CartModel = require("../model/cart")
const CartRoute = express.Router()
const validate = require("../middleware/postmiddleware")
const cartmodel = require("../model/cart")

CartRoute.post("/add", validate, async (req, res) => {
    
    try {
       
        const { img, title, price, brand, email } = req.body

        if (!img || !title || !price || !brand || !email) {
            return res.status(405).json({msg:"Please select the item first"})
        }

        const ExistinginCart =await cartmodel.find({ title, price, img, brand, email })
        
        if (ExistinginCart.length>0) {
            return res.status(200).json({msg:"Item is already present in the cart"})
        }
        const NewData = new CartModel({ img, title, price, brand, email })
        await NewData.save()
       return res.status(200).json({msg:"Item added to the cart"})
       

    } catch (error) {
        console.log(error);
      return  res.status(500).json({error:error})
    }

})
CartRoute.get("/show", validate, async (req, res) => {
    try {
        const { email } = req.body

        if (email) {
            const CartData = await cartmodel.find({ email })
            if (CartData.length>0) {
                return res.status(200).json(CartData)
            }
            res.status(200).json({msg:"Your cart is empty"})
        } else {
            res.status(400).json({msg:"Not Authorised"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

})
CartRoute.delete("/Remove/:id",validate, async (req, res) => {
    try {
        const { id } = req.params
        const {email}=req.body
        const data=await cartmodel.find({email})
        for(const item of data){
            if(item._id==id){
                const CartData = await cartmodel.findByIdAndDelete(id)
                return res.status(200).json("Item removed from cart")
            }
        }
        return res.status(200).json({msg:"item is not present in your cart"})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

})
module.exports = CartRoute