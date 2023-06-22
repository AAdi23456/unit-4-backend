const mongoose = require("mongoose")

const cart = mongoose.Schema({
    img:String,
    title: String,
    brand:String,
    price:String,
     email:String,
     quantity:{default:1,type:Number}
}, {
    versionKey: false
})
const cartmodel = mongoose.model("cart",cart)
module.exports =cartmodel
