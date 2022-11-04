const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let rubriqueID = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Rubrique",
  default: null,
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
  state: { type: Boolean, default: true },
  carousel: { type: Boolean, default: false },
  actu: { type: Boolean, default: false },
  channel: { type: Boolean, default: false },
  cmp: { type: Number, default: 0 },
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

  rubriqueId: [rubriqueID],
});
module.exports = mongoose.model("Content", ContentSchema);
