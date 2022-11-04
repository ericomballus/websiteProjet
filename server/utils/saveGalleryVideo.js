const { createWriteStream } = require("fs");
const multiparty = require("multiparty");
var img = require("imagemagick");
var util = require("util");
const thumbsupply = require("thumbsupply");
const path = require("path");
let imagePath;
let pathVideoFr;
let pathVideoEn;
module.exports = (req, res, next) => {
  var count = 0;
  var form = new multiparty.Form();

  form.on("error", function (err) {
    console.log("Error parsing form: " + err.stack);
  });

  form.on("field", function (field, value) {
    req.body[field] = value;
  });

  // Parts are emitted when parsing the form
  form.on("part", function (part) {
    // You *must* act on the part by reading it
    // NOTE: if you want to ignore it, just call "part.resume()"

    if (part.filename === undefined) {
      // ignore field's content
      part.resume();
    }

    if (part.filename !== undefined) {
      // filename is defined when this is a file
      count++;

      if (part.name == "contentVideoFr") {
        let filename = part.filename.split(path.extname(part.filename))[0];
        let name = `${filename}-${Date.now()}LinkFr.mp4`;
        imagePath = `${filename}-${Date.now()}.png`;
        req.body["videoFrURL"] =
          req.protocol +
          "://" +
          req.get("host") +
          "/gallery-video/video" +
          name;
        // req.body["thumb"] = imagePath;
        pathVideoFr = `./VideoMedia/${name}`;
        part.pipe(createWriteStream(`${pathVideo}`));
      }
      if (part.name == "contentVideoEn") {
        let filename = part.filename.split(path.extname(part.filename))[0];
        let name = `${filename}-${Date.now()}LinkEn.mp4`;
        imagePath = `${filename}-${Date.now()}.png`;
        req.body["videoEnURL"] =
          req.protocol +
          "://" +
          req.get("host") +
          "/gallery-video/video" +
          name;
        // req.body["thumb"] = imagePath;
        pathVideoEn = `./VideoMedia/${name}`;
        part.pipe(createWriteStream(`${pathVideo}`));
      }

      part.resume();
    }

    part.on("error", function (err) {
      // decide what to do
    });
  });

  // Close emitted after form parsed
  form.on("close", async () => {
    if (pathVideoFr) {
      thumbsupply
        .generateThumbnail(pathVideoFr, {
          size: thumbsupply.ThumbSize.LARGE, // or ThumbSize.LARGE
          timestamp: "10%", // or `30` for 30 seconds
          forceCreate: true,
          cacheDir: `./VideoMedia/thumb`,
          mimetype: "video/mp4",
        })
        .then((thumPath) => {
          req.body["thumb"] =
            req.protocol +
            "://" +
            req.get("host") +
            "/gallery-video/" +
            thumPath;
          next();
        })
        .catch((err) => {
          next();
        });
    } else if (pathVideoEn) {
      thumbsupply
        .generateThumbnail(pathVideoEn, {
          size: thumbsupply.ThumbSize.LARGE, // or ThumbSize.LARGE
          timestamp: "10%", // or `30` for 30 seconds
          forceCreate: true,
          cacheDir: `./VideoMedia/thumb`,
          mimetype: "video/mp4",
        })
        .then((thumPath) => {
          req.body["thumb"] =
            req.protocol +
            "://" +
            req.get("host") +
            "/gallery-video/" +
            thumPath;
          next();
        })
        .catch((err) => {
          next();
        });
    }
  });

  // Parse req
  form.parse(req);
};
