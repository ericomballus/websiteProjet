const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

router.post("/signup", async (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      console.log(user.length);
      if (user.length >= 1) {
        console.log("existe deja");
        res.status(500).json({
          message: "User with this email exist please choose another one!!",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: err,
            });
          }
          const user = new User({
            email: req.body.email,
            role: req.body.role,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            password: hash,
            role: req.body.role,
            accessRightId: req.body.accessRightId,
          });
          user
            .save()
            .then((result) => {
              console.log(result);
              req.io.sockets.emit(`newUser`, result);
              res.status(201).json({
                message: result,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
        });
      }
    });
});

router.post("/login", async (req, res, next) => {
  try {
    let user = await User.find({ email: req.body.email }).exec();
    if (user.length < 1) {
      return res.status(401).json({
        message2: `Auth failed, ${req.body.email}, not found!`,
      });
    }

    bcrypt.compare(req.body.password, user[0].password, async (err, result) => {
      if (!result) {
        return res.status(401).json(`Auth failed password,is not correct`);
      }
      if (result) {
        let token = await require("../../utils/createToken")(user[0]);
        let credentials = user[0];
        return res.status(200).json({ credentials, token });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: err,
      message3: `Auth failed password msg 3`,
    });
  }
});

router.get("/", (req, res, next) => {});

router.get("/:id", async (req, res, next) => {});

router.delete("/:id", (req, res, next) => {});

router.patch("/", (req, res, next) => {
  const id = req.body._id;
  if (req.body.newpassword) {
    bcrypt.hash(req.body.newpassword, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        req.body["password"] = hash;
        delete req.body.newpassword;
        console.log(req.body);
        User.update({ _id: id }, { $set: req.body })
          .exec()
          .then((result) => {
            res.status(200).json({
              message: "produit mise a jour",
              resultat: req.body,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({
              error: err,
            });
          });
      }
    });
  } else {
    User.update({ _id: id }, { $set: req.body })
      .exec()
      .then((result) => {
        res.status(200).json({
          message: "update",
          resultat: req.body,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          error: err,
        });
      });
  }
});
//});
module.exports = router;
