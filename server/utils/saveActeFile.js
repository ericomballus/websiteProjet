const { createWriteStream } = require("fs");
const multiparty = require("multiparty");
var img = require("imagemagick");
var util = require("util");
const thumbsupply = require("thumbsupply");
const path = require("path");
let imagePath;
let pathVideo;
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
      if (part.name == "acteImage") {
        let name = `${part.filename}-${Date.now()}.png`;
        // req.body["imageURL"] = path.join("ActeImageMedia", name);
        req.body["imageURL"] =
          req.protocol + "://" + req.get("host") + "/actes/" + name;
        part.pipe(createWriteStream(`./ActeMedia/${name}`));
      }
      if (part.name == "acteDoc") {
        let filename = part.filename.split(path.extname(part.filename))[0];
        let name = `${filename}-${Date.now()}${path.extname(part.filename)}`;
        req.body["docUrl"] =
          req.protocol + "://" + req.get("host") + "/actes/" + name;
        pathDoc = `./ActeMedia/${name}`;
        part.pipe(createWriteStream(`${pathDoc}`));
      }

      //  imagePath = null;
      // ignore file's content here
      part.resume();
    }

    part.on("error", function (err) {
      // decide what to do
    });
  });

  // Close emitted after form parsed
  form.on("close", async () => {
    next();
    /*
    thumbsupply
      .generateThumbnail(pathVideo, {
        size: thumbsupply.ThumbSize.LARGE, // or ThumbSize.LARGE
        timestamp: "10%", // or `30` for 30 seconds
        forceCreate: true,
        cacheDir: `./ImageMedia`,
        mimetype: "video/mp4",
      })
      .then((thumPath) => {
        req.body["imageUrl"] = thumPath;
        next();
      })
      .catch((err) => {
        next();
      });
      */
  });

  // Parse req
  form.parse(req);
};
