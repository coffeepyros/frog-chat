var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const url =
  "mongodb+srv://admin:vlDWupMk5md8LnhR@cluster0.5xhl1.mongodb.net/projectmanager?retryWrites=true&w=majority";

// MONGOOSE DB CONNECTION
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => {
  console.log("mongoDB connection successful.");
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(
  cors({
    "Access-Control-Allow-Origin": "http://localhost:5000",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;