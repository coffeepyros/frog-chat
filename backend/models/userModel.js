const mongoose = require("mongoose");

// DEFINE DB SCHEMA
let userSchema = new mongoose.Schema({
  // no need for ID, it is created automatically
  username: String,
  email: String,
  password: String,
});

let userModel = mongoose.model("User", userSchema); // puts data into collection "users" !!!

module.exports = userModel;
