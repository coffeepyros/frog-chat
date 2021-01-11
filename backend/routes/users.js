var express = require("express");
var router = express.Router();
const userModel = require("../models/userModel");

router.post("/add", function (req, res, next) {
  console.log("Request data:", req.body);
  let newUser = new userModel(req.body);
  newUser.save((err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/login", function (req, res, next) {
  console.log("Request data:", req.body);
  userModel
    .find(req.body)
    .then((result) => {
      console.log(result);
      if (result.length > 0) {
        console.log("FOUND!");
        res.send({ login: true, user: result });
      } else {
        console.log("NOT FOUND!");
        res.send({ login: false });
      }
    })
    .catch((err) => console.log(err));
});

router.put("/update", function (req, res, next) {
  console.log("Request data:", req.body);

  userModel
    .updateOne({ username: req.body.username }, req.body)
    .then((result) => {
      if (result.nModified > 0) {
        console.log(result.nModified);
        res.send({ update: true });
      }
    })
    .catch((err) => console.log(err));

  // let newUser = new userModel(req.body);
  // newUser.save((err, result) => {
  //   if (err) throw err;
  //   res.send(result);
  // });
});

module.exports = router;
