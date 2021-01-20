var express = require("express");
var router = express.Router();
const messageModel = require("../models/messageModel");

router.get("/list", function (req, res, next) {
  console.log("Request data:", req.body);
  messageModel.find({}, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/add", function (req, res, next) {
  console.log("Request data:", req.body);
  let newMessage = new messageModel(req.body);
  newMessage.save((err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
