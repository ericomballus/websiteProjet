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
  reference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rubrique",
    default: null,
  },
  cmp: { type: Number, default: 0 },
  imagesURL: { type: Array, default: [] },
});
module.exports = mongoose.model("galleryimage", GalleryImageSchema);
//
