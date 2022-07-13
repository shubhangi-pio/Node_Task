var express = require('express');
const mongoose = require("mongoose");
const app = express();
var router = express.Router();
const keycloak = require('../config/keycloak-config.js').getKeycloak();
const db =
  "mongodb+srv://MEAN:MEAN@cluster0.duubde3.mongodb.net/meanstack?retryWrites=true&w=majority";

mongoose
  .connect(db)
  .then(() => {
    console.log("connected DB");
  })
  .catch((err) => console.log("No connection"));

app.use(express.json());

const User = require("../model/userSchema.js");

router.get("/users", keycloak.protect('app-user'), async (req, res) => {
    try {
      const newPost = await User.find();
  
      res.status(201).json({
        message: "all data",
        user: newPost,
      });
    } catch (err) {
      res.status(201).json({
        message: err.message,
      });
    }
  });
  
  router.post("/users", async (req, res) => {
    const { name, cost, desc } = req.body;
  
    try {
      const newPost = await User.create({ name, cost, desc });
  
      res.status(201).json({
        message: "inserted",
        user: newPost,
      });
    } catch (err) {
      res.status(201).json({
        message: err.message,
      });
    }
  
    // try {
    //   const insert = await (
    //     await axios.post("http://localhost:3000/users", {
    //       name: name,
    //       cost: cost,
    //       desc: desc,
    //     })
    //   ).data;
  
    //   res.status(201).json({
    //     message: "inserted",
    //     user: insert,
    //   });
  
    //   const user = new User({ name, cost, desc });
    //   user.save().then(() => {
    //     res.status(201).json({
    //       message: "inserted",
    //       user: insert,
    //     });
    //   });
    // } catch (err) {
    //   res.status(201).json({
    //     message: err.message,
    //   });
    // }
  });
  
  router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
  
    try {
      const newPost = await User.findById(id);
      await newPost.remove();
  
      res.status(201).json({
        message: "deleted",
        user: newPost,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  
    // try {
    //   const insert = await (
    //     await axios.delete(`http://localhost:3000/users/${id}`)
    //   ).data;
  
    //   res.status(201).json({
    //     message: "deleted",
    //     user: insert,
    //   });
    //   const user = new User({ id });
    //   user.save().then(() => {
    //     res.status(201).json({
    //       message: "deleted",
    //       user: insert,
    //     });
    //   });
    // } catch (err) {
    //   res.status(201).json({
    //     message: err.message,
    //   });
    // }
  });
  
  router.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, cost, desc } = req.body;
  
    try {
      const newPost = await User.findByIdAndUpdate(id, { ...req.body });
  
      res.status(201).json({
        message: "updated",
        user: newPost,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  
    // try {
    //   const insert = await (
    //     await axios.put(`http://localhost:3000/users/${id}`, {
    //       name: name,
    //       cost: cost,
    //       desc: desc,
    //     })
    //   ).data;
  
    //   res.status(201).json({
    //     message: "updated",
    //     user: insert,
    //   });
  
    // } catch (err) {
    //   res.status(201).json({
    //     message: err.message,
    //   });
    // }
  });
module.exports = router;