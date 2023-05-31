const mongoose = require("mongoose")

const cart = mongoose.Schema({
    img:Array,
    title: String,
    Brand:String,
    price:String,
    category:String,
    colour:String,
     dsc:String,
     email:String
}, {
    versionKey: false
})
const cartmodel = mongoose.model("cart",cart)
module.exports =cartmodel
