const express = require("express");
const mongoose = require("mongoose");
const GalleryVideosModel = require("../models/GalleryVideos");
const router = express.Router();
let io = require("socket.io");
let saveVideo = require("../../utils/saveGalleryVideo");
const path = require("path");
const fs = require("fs");
router.post(
  "/",
  // require("../../utils/verifyToken"),
  saveVideo,
  async (req, res, next) => {
    console.log(req.body);
    try {
      const doc = new GalleryVideosModel(req.body);
      const v = await doc.save();
      req.io.sockets.emit(`content`, v);

      res.status(200).json(v);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    let docs = await GalleryVideosModel.find({}, "-__v")
      .sort({ _id: -1 })
      .populate("authorId")
      .lean()
      .exec();
    const count = await GalleryVideosModel.countDocuments();
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", (req, res, next) => {
  let UPLOAD_PATH_IMAGE = "VideoMedia/thumb";
  let imagePath = path.join(UPLOAD_PATH_IMAGE, req.params.id);
  fs.access(imagePath, fs.F_OK, (e) => {
    if (e) {
      res.status(400).json({
        error: "image inexistante",
      });
      return;
    }

    fs.createReadStream(imagePath).pipe(res);
  });
});

router.get("/video/:id", (req, res, next) => {
  let UPLOAD_PATH_VIDEO = "VideoMedia";
  let videoPath = path.join(UPLOAD_PATH_VIDEO, req.params.id);
  fs.access(videoPath, fs.F_OK, (e) => {
    if (e) {
      res.status(400).json({
        error: "image inexistante",
      });
      return;
    }

    // fs.createReadStream(videoPath).pipe(res);
    require("../../utils/videoManager")(
      path.join(UPLOAD_PATH_VIDEO, req.params.id),
      res,
      req
    );
  });
});

router.delete("/:id", async (req, res, next) => {
  try {
    let Id = req.params.id;
    const filter = { _id: Id };
    let result = await GalleryVideosModel.findOneAndRemove(filter);
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json(error);
  }
});

router.patch("/:id", async (req, res, next) => {});

module.exports = router;
