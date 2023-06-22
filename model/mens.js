const mongoose = require("mongoose")

const notesschema = mongoose.Schema({
    img:String,
    title: String,
    brand:String,
    price: String,
    category:String,
    colour:String,
}, {
    versionKey: false
})
const mensmodel = mongoose.model("mens", notesschema)
module.exports = mensmodel