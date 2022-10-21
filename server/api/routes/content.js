const express = require("express");
const mongoose = require("mongoose");
const ContentModel = require("../models/ContentModel");
const router = express.Router();
let io = require("socket.io");
let saveVideo = require("../../utils/saveVideo");
const path = require("path");
const fs = require("fs");
router.post(
  "/",
  require("../../utils/verifyToken"),
  saveVideo,
  async (req, res, next) => {
    console.log(req.body);
    try {
      const doc = new ContentModel(req.body);
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
    let docs = await ContentModel.find({}, "-__v")
      .sort({ _id: -1 })
      .populate("authorId")
      .lean()
      .exec();
    const count = await ContentModel.countDocuments();
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", (req, res, next) => {
  let UPLOAD_PATH_IMAGES = "ImageMedia";
  let UPLOAD_PATH_VIDEO = "VideoMedia";
  let imagePath;
  let videoPath;
  let contentId = req.params.id;
  console.log(contentId);
  ContentModel.findById(contentId, (err, content) => {
    console.log(content);
    if (!err && content) {
      if (content.imageUrl == "null" || content.imageUrl == null) {
        // imagePath = path.join(UPLOAD_PATH_IMAGES, content.imageUrl);
      } else {
        imagePath = path.join(UPLOAD_PATH_IMAGES, content.imageUrl);
        fs.access(imagePath, fs.F_OK, (e) => {
          if (e) {
            res.status(400).json({
              error: "image inexistante",
            });
            return;
          }
          res.setHeader("Content-Type", "image/jpeg");

          fs.createReadStream(
            path.join(UPLOAD_PATH_IMAGES, content.imageUrl)
          ).pipe(res);
        });
      }
    } else {
      res.status(400).json(err);
    }
  });
});

router.get("/video/:id", (req, res, next) => {
  let UPLOAD_PATH_VIDEO = "VideoMedia";
  let videoPath;
  let contentId = req.params.id;

  ContentModel.findById(contentId, (err, content) => {
    if (!err && content) {
      if (content.videoUrl) {
        videoPath = path.join(UPLOAD_PATH_VIDEO, content.videoUrl);
      }

      fs.access(videoPath, fs.F_OK, (e) => {
        if (e) {
          res.status(400).json({
            error: "video inexistante",
          });
          return;
        }
        // res.setHeader("Content-Type", "video/mp4");
        /*  fs.createReadStream(
          path.join(UPLOAD_PATH_VIDEO, content.videoUrl)
        ).pipe(res);*/
        require("../../utils/videoManager")(
          path.join(UPLOAD_PATH_VIDEO, content.videoUrl),
          res,
          req
        );
      });
    } else {
      res.status(400).json(err);
    }
  });
});

router.delete("/:id", async (req, res, next) => {
  try {
  } catch (e) {
    console.error(e);
  }
});

router.patch("/:id", async (req, res, next) => {});

module.exports = router;
