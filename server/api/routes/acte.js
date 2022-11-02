const express = require("express");
const mongoose = require("mongoose");
const ActesModel = require("../models/Actes");
const router = express.Router();
let io = require("socket.io");
const path = require("path");
const fs = require("fs");
//const upload = require("../../utils/imageUploader");
const saveActeFile = require("../../utils/saveActeFile");
router.post("/", saveActeFile, async (req, res, next) => {
  console.log(req.body);
  if (req.body.reference) {
    req.body["reference"] = parseInt(req.body.reference);
  }
  try {
    const doc = new ActesModel(req.body);
    const v = await doc.save();
    req.io.sockets.emit(`actes`, v);

    res.status(200).json(v);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let docs = await ActesModel.find({}, "-__v")
      .sort({ _id: -1 })
      .lean()
      .exec();
    const count = await ActesModel.countDocuments();
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", (req, res, next) => {
  let UPLOAD_PATH_IMAGES = "ActeMedia";
  let ext = path.extname(req.params.id);
  console.log("extension====>", ext);
  let h = "image/jpeg";
  if (ext == ".pdf") {
    h = "application/pdf";
  }
  let imagePath = path.join(UPLOAD_PATH_IMAGES, req.params.id);
  fs.access(imagePath, fs.F_OK, (e) => {
    if (e) {
      res.status(400).json({
        error: "image inexistante",
      });
      return;
    }
    res.setHeader("Content-Type", h);

    fs.createReadStream(imagePath).pipe(res);
  });
});

router.get("/video/:id", (req, res, next) => {
  let UPLOAD_PATH_VIDEO = "VideoMedia";
  let videoPath;
  let contentId = req.params.id;

  ActesModel.findById(contentId, (err, content) => {
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
    let Id = req.params.id;
    const filter = { _id: Id };
    let result = await ActesModel.findOneAndRemove(filter);
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json(error);
  }
});

router.patch("/:id", async (req, res, next) => {});

module.exports = router;
