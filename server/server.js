const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Admin = mongoose.mongo.Admin;
const cors = require("cors");

var path = require("path");
const fs = require("fs");
const { MongoClient } = require("mongodb");
let ObjectId = require("mongoose").Types.ObjectId;
const port = process.env.PORT || 3000;
let io = require("socket.io").listen(
  app.listen(port, () => {
    try {
      const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      };
      const uri = "mongodb://localhost:27017/Prc";
      mongoose.connect(uri, options, (err) => {
        if (err) {
          console.log(err);
          // process.exit(1);
        } else {
          console.log(
            "connected to MongoDB Port",
            port,
            "and plateForm",
            process.platform
          );
          require("./utils/createAdmin")();
        }
      });
      mongoose.connection.on("error", (err) => {
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  })
);

app.set("view engine", "ejs");
app.use(morgan("dev"));

app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
      flags: "a",
    }),
  })
);

io.sockets.on("connection", (socket) => {
  console.log("client connect");
  io.sockets.emit("connect");
  socket.on("echo", function (data) {
    io.sockets.emit("message", data);
  });
  socket.on("isConnect", function (socket) {
    console.log("je suis connecté dispo");
  });
  socket.on("login", function (data) {
    console.log(data);
  });
  socket.on("disconnect", function (data) {});
});
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(require("./utils/logger"));
//app.use(require("./utils/createToken"));
app.use("/", express.static("www"));
app.use(function (req, res, next) {
  req.io = io;
  next();
});

app.use(function (req, res, next) {
  let oldSend = res.send;
  res.send = function (data) {
    oldSend.apply(res, arguments);
  };
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, mimeType, Accept, Authorization'
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET,OPTIONS"
    );
  }
  next();
});

//routes
app.use("/home", express.static("www"));

app.use("/content", require("./api/routes/content"));
app.use("/visitor", require("./api/routes/visitor"));
app.use("/user", require("./api/routes/user"));
app.use("/rubriques", require("./api/routes/rubrique"));
app.use("/gallery", require("./api/routes/gallery"));
app.use((req, res, next) => {
  const error = new Error("Not found ");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

//process.on()

module.exports = app;
