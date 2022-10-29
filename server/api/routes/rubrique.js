const express = require("express");
const mongoose = require("mongoose");
const Rubrique = require("../models/Rubriques");
const router = express.Router();
let io = require("socket.io");

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const doc = new Rubrique(req.body);
    console.log(doc);
    const rbr = await doc.save();
    req.io.sockets.emit(`Rubrique`, rbr);
    res.status(201).json(rbr);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let docs = await Rubrique.find({}, "-__v").sort({ name: -1 }).lean().exec();
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let Id = req.params.id;
    const filter = { _id: Id };
    0;
    let result = await Rubrique.findOneAndRemove(filter);
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  let Id = req.params.id;
  const filter = { _id: Id };
  const update = req.body;
  try {
    let result = await Rubrique.findOneAndUpdate(
      filter,
      { $set: update },
      { new: true }
    );
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json(error);
  }
});

module.exports = router;
