const express = require("express");
const mongoose = require("mongoose");
const Visitor = require("../models/VisitorModel");
const router = express.Router();
let io = require("socket.io");

router.post("/", async (req, res, next) => {
  try {
    let visitor = await Visitor.find({ visitorIP: req.body.visitorIP });
    if (visitor && visitor.length) {
      let v = visitor[0];
      let token = await require("../../utils/createToken")(v);
      res.status(200).json(token);
    } else {
      const doc = new Visitor(req.body);
      const v = await doc.save();
      req.io.sockets.emit(`visitor`, v);
      let token = await require("../../utils/createToken")(v);
      res.status(200).json(token);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/", async (req, res, next) => {
  let page = 1;
  const limit = 20;
  if (req.query.page) {
    page = req.query.page;
  }
  try {
    let docs = await Visitor.find({}, "-__v")
      .sort({ _id: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean()
      .exec();
    const count = await Visitor.countDocuments();
    let resultat = {
      docs,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      itemsPerPage: limit,
      count: count,
    };
    res.status(200).json(resultat);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:byQuery", async (req, res, next) => {
  try {
    const filter = req.query;
    let docs = await Visitor.find(filter).sort({ _id: 1 }).lean().exec();
    if (docs.length > 0) {
      res.status(200).json(docs);
    } else {
      let obj = {};
      for (const key in filter) {
        obj[key] = filter[key].toUpperCase();
      }
      let result = await Visitor.find(obj).sort({ _id: 1 }).lean().exec();
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let Id = req.params.id;
    const filter = { _id: Id };
    let result = await Visitor.findOneAndRemove(filter);
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
  console.log(update);
  try {
    let result = await Visitor.findOneAndUpdate(
      filter,
      { $set: update },
      { new: true }
    );
    if (result) {
      res.status(200).json(result);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

module.exports = router;
