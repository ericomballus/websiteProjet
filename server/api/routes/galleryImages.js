const express = require("express");
const mongoose = require("mongoose");
const GalleryModel = require("../models/GalleryImagesModel");
const router = express.Router();
let io = require("socket.io");
const path = require("path");
const fs = require("fs");
//const upload = require("../../utils/imageUploader");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "GalleryImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
let upload = multer({ storage: storage });
router.post("/", upload.array("images"), async (req, res, next) => {
  //console.log(req.body.images);

  let arrImages = req.files;
  arrImages.forEach((img) => {
    img["url"] =
      req.protocol + "://" + req.get("host") + "/gallery/" + img.filename;
  });
  console.log(req.files);
  try {
    let gallery = await GalleryModel.create({
      imagesURL: arrImages,
      titleFrench: req.body.titleFrench,
      titleEnglish: req.body.titleEnglish,
      authorId: req.body.authorId,
    });
    console.log(gallery);
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let docs = await GalleryModel.find({}, "-__v")
      .sort({ _id: -1 })
      .lean()
      .exec();
    const count = await GalleryModel.countDocuments();
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", (req, res, next) => {
  let UPLOAD_PATH_IMAGES = "GalleryImages";

  let imagePath = path.join(UPLOAD_PATH_IMAGES, req.params.id);
  fs.access(imagePath, fs.F_OK, (e) => {
    if (e) {
      res.status(400).json({
        error: "image inexistante",
      });
      return;
    }
    res.setHeader("Content-Type", "image/jpeg");

    fs.createReadStream(imagePath).pipe(res);
  });
});

router.delete("/:id", async (req, res, next) => {
  try {
    let Id = req.params.id;
    const filter = { _id: Id };
    let result = await GalleryModel.findOneAndRemove(filter);
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json(error);
  }
});

router.patch("/:id", async (req, res, next) => {});

module.exports = router;
