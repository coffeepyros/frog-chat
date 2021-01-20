const mongoose = require("mongoose");
var Schema = mongoose.Schema;

// DEFINE DB SCHEMA
let userSchema = Schema({
  // no need for ID, it is created automatically
  username: String,
  email: String,
  password: String,
});

// puts data into collection "users" !!!
module.exports = mongoose.model("User", userSchema);
