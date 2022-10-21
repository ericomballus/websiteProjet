const { createWriteStream } = require("fs");
const multiparty = require("multiparty");
var util = require("util");
module.exports = (req, res, next) => {
  var count = 0;
  var form = new multiparty.Form();

  form.on("error", function (err) {
    console.log("Error parsing form: " + err.stack);
  });

  form.on("field", function (field, value) {
    console.log(field, "====>", value);
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

      if (part.name == "contentVideo") {
        let name = `${part.filename}-${Date.now()}.mp4`;
        req.body["videoUrl"] = name;
        part.pipe(createWriteStream(`./VideoMedia/${name}`));
      }
      if (part.name == "contentImage") {
        let name = `${part.filename}-${Date.now()}.png`;
        req.body["imageUrl"] = name;
        part.pipe(createWriteStream(`./ImageMedia/${name}`));
      }
      // ignore file's content here
      part.resume();
    }

    part.on("error", function (err) {
      // decide what to do
    });
  });

  // Close emitted after form parsed
  form.on("close", function () {
    console.log("Upload completed!");
    next();
  });

  // Parse req
  form.parse(req);
};
