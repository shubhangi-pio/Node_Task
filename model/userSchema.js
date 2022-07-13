const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  cost: {
    type: Number,
  },
  desc: {
    type: String,
  },
});

const User =mongoose.model('USER',userSchema);

module.exports=User;