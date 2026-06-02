const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username:String,
  email:{
    type:String,
    unique:true,
  },
  password:String,
});

const usermodel = mongoose.model("post", userSchema);
module.exports = usermodel;

