const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const GalleryVideoSchema = new Schema({
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
  videoURL: { type: String, required: true },
  thumb: { type: String, required: true },
});
module.exports = mongoose.model("galleryvideo", GalleryVideoSchema);
//
