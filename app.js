const express = require("express");
const axios = require("axios").default;
const app = express();

app.use(express.json());

app.get("/users",async (req, res) => {

    try {
        const insert = await (
          await axios.get(`http://localhost:3000/users`)
        ).data;
    
        res.status(201).json({
          message: "all data",
          user:insert
        });
      } catch (err) {
        res.status(201).json({
          message: err.message,
        });
      }
});

app.post("/users", async (req, res) => {
  const {name,cost,desc} = req.body;
  try {
    const insert = await (
      await axios.post("http://localhost:3000/users", { name: name,cost:cost,desc:desc})
    ).data;

    res.status(201).json({
      message: "inserted",
      user: insert,
    });
  } catch (err) {
    res.status(201).json({
      message: err.message,
    });
  }
});

app.delete("/users", async (req, res) => {
    const {id}= req.body;
   
    try {
      const insert = await (
        await axios.delete(`http://localhost:3000/users/${id}`)
      ).data;
  
      res.status(201).json({
        message: "deleted",
        user:insert
      });
    } catch (err) {
      res.status(201).json({
        message: err.message,
      });
    }
  });

  app.put("/users", async (req, res) => {
    const {id,name,cost,desc}= req.body;
   
    try {
      const insert = await (
        await axios.put(`http://localhost:3000/users/${id}`,{name:name,cost:cost,desc:desc})
      ).data;
  
      res.status(201).json({
        message: "updated",
        user:insert
      });
    } catch (err) {
      res.status(201).json({
        message: err.message,
      });
    }
  });

app.listen(5000, () => {
  console.log(" running port 5000");
});
