require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
  try{
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  }catch{
    console.log("Error in connection");
  }
}
module.exports = connectDB;
