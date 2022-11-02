const mongoose = require("mongoose");
var Schema = mongoose.Schema;
let rbrID = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Rubrique",
  default: null,
  //required: true,
};
const ContentSchema = new Schema({
  created: { type: Date, default: Date.now },
  titleFrench: { type: String, default: " " },
  titleEnglish: { type: String, default: " " },
  texteFrench: { type: String, default: null },
  texteEnglish: { type: String, default: null },
  videoFrUrl: { type: String, default: null },
  videoEnUrl: { type: String, default: null },
  imageUrl: { type: String, default: null },
  audioFrUrl: { type: String, default: null },
  audioEnUrl: { type: String, default: null },
  docFrUrl: { type: String, default: null },
  docEnUrl: { type: String, default: null },
  state: { type: Boolean, default: false, required: true },
  lastUpdate: {
    type: Array,
    default: [Date.now],
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
    required: true,
  },

  rubriqueId: [rbrID],
});
module.exports = mongoose.model("Content", ContentSchema);
