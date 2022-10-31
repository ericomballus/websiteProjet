const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const GallerySchema = new Schema({
  created: { type: Date, default: Date.now },
  titleFrench: { type: String, default: " " },
  titleEnglish: { type: String, default: " " },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
    required: true,
  },
  imagesURL: { type: Array, default: [] },
});
module.exports = mongoose.model("gallery", GallerySchema);
