const express = require("express")

const notes_post = express.Router()
const kidsmodel = require("../model/kids");
const mensmodel = require("../model/mens");
const Routes = express.Router()
const menmodel = require("../model/mens");
const womenmodel = require("../model/womens");
Routes.post("/kid/add", async (req, res) => {
    const notes = req.body;
    if (notes) {
        replacedoolor(notes)
    }
    await kidsmodel.insertMany(notes);
    res.json({ "msg": ` data added` });
});
Routes.post("/womens/add", async (req, res) => {
    const notes = req.body;
    if (notes) {
        replacedoolor(notes)
    }
    await womenmodel.insertMany(notes);
    res.json({ "msg": ` data added` });
})
Routes.post("/men/add", async (req, res) => {
    const notes = req.body;
    if (notes) {
        replacedoolor(notes)
    }
    await menmodel.insertMany(notes);
    res.json({ "msg": ` data added` });
})

Routes.get("/kid/show", async (req, res) => {



    try {
        let query = {};
        if (req.query.title) {
            query.title = { $regex: req.query.title, $options: "i" };
        }
        if (req.query.Brand) {
            query.Brand = { $regex: req.query.Brand, $options: "i" };
        }
        if (req.query.color) {
            query.color = { $regex: req.query.color, $options: "i" };
        }

        const sort = {};
        if (req.query.sbp) {
            if (req.query.sbp === "asc") {
                sort.price = 1;
            } else if (req.query.sbp === "desc") {
                sort["price"] = -1;
            }
        }
        const limit = req.query.page ? 20 : 0;
        const skip = (req.query.page - 1) * limit;
        const notes = await kidsmodel.find(query).skip(skip).limit(limit).sort(sort);
        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
});

Routes.get("/womens/show", async (req, res) => {
    try {
        let query = {};
        if (req.query.title) {
            query.title = { $regex: req.query.title, $options: "i" };
        }
        if (req.query.Brand) {
            query.Brand = { $regex: req.query.Brand, $options: "i" };
        }
        if (req.query.color) {
            query.color = { $regex: req.query.color, $options: "i" };
        }

        const sort = {};
        if (req.query.sbp) {
            if (req.query.sbp === "asc") {
                sort.price = 1;
            } else if (req.query.sbp === "desc") {
                sort["price"] = -1;
            }
        }
        const limit = req.query.page ? 20 : 0;
        const skip = (req.query.page - 1) * limit;
        const notes = await womenmodel.find(query).skip(skip).limit(limit).sort(sort);
        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }

})

Routes.get("/men/show", async (req, res) => {
    try {
        let query = {};
        if (req.query.title) {
            query.title = { $regex: req.query.title, $options: "i" };
        }
        if (req.query.brand) {
            query.Brand = { $regex: req.query.brand, $options: "i" };
        }
        if (req.query.color) {
            query.color = { $regex: req.query.color, $options: "i" };
        }

        const sort = {};
        if (req.query.sbp) {
            if (req.query.sbp === "asc") {
                sort.price = 1;
            } else if (req.query.sbp === "desc") {
                sort["price"] = -1;
            }
        }
        const limit = req.query.page ? 20 : 0;
        const skip = (req.query.page - 1) * limit;
        const notes = await menmodel.find(query).skip(skip).limit(limit).sort(sort);
        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }

})


Routes.get("/kid/one/:id", async (req, res) => {

    try {
        if (req.params) {
            const { id } = req.params
            const data = await kidsmodel.findById(id)
            res.status(200).json(data)
        }
        else {
            res.status(404).json({ "msg": "please provide the id" })
        }
    } catch (error) {
        res.status(404).json({ "msg": "login first" })
        console.log(error);
    }
})
Routes.get("/men/one/:id", async (req, res) => {

    try {
        if (req.params) {
            const { id } = req.params
            const data = await mensmodel.findById(id)
            res.status(200).json(data)
        }
        else {
            res.status(404).json({ "msg": "please provide the id" })
        }
    } catch (error) {
        res.status(404).json({ "msg": "login first" })
        console.log(error);
    }
})
Routes.get("women/one/:id", async (req, res) => {

    try {
        if (req.params) {
            const { id } = req.params
            const data = await womenmodel.findById(id)
            res.status(200).json(data)
        }
        else {
            res.status(404).json({ "msg": "please provide the id" })
        }
    } catch (error) {
        res.status(404).json({ "msg": "login first" })
        console.log(error);
    }
})




Routes.delete("/kid/deleteone/:id", async (req, res) => {

    try {

        if (req.params) {
            const { id } = req.params
            const data = await kidsmodel.findByIdAndDelete(id)
            res.status(200).json({ "msg": "data deleted" })
        } else {
            res.status(404).json({ "msg": "please provide the id" })
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({ "msg": "doing something wrong please try again" })
    }
})

function replacedoolor(data) {
    if (data) {

        data.forEach(element => {
            if (element && element.price) {
                element.price = element.price.replaceAll("$", "")
            }
        });
    }
}



module.exports = Routes

  
