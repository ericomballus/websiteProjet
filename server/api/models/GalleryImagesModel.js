const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const GalleryImageSchema = new Schema({
  created: { type: Date, default: Date.now },
  titleFrench: { type: String, default: " " },
  titleEnglish: { type: String, default: " " },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
    required: true,
  },
  reference: { type: String, default: "president" }, //firstlady
  imagesURL: { type: Array, default: [] },
});
module.exports = mongoose.model("galleryimage", GalleryImageSchema);
//
