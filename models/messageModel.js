const mongoose = require("mongoose");

// DEFINE DB SCHEMA
let messageSchema = new mongoose.Schema({
  // no need for ID, it is created automatically
  userFrom: String,
  userTo: String,
  timestamp: String,
  message: String,
});

let messageModel = mongoose.model("Message", messageSchema); // puts data into collection "users" !!!

module.exports = messageModel;
