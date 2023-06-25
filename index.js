const express = require("express")
const app = express()
const cors = require("cors");
app.use(express.json())
const Authrozation=require("./routes/login")
const {connection}  = require("./conncetion")
const  Routes  = require("./routes/data")
const cart=require("./routes/cart")
const payment=require("./routes/payment")
app.use(cors())
app.use("/cart",cart)
app.use("/",Routes)
app.use("/auth",Authrozation)
app.use("/aadiswipe",payment)
app.listen(3000, () => {
    try {
        connection()
    } catch (error) {
        console.log(error);
    }
});
//http://localhost:3000/getkids?page=1&title=value&color=value&Brand=value&minPrice=value&maxPrice=value&sbp=asc/desc
