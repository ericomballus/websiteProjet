const mongoose = require("mongoose");
var Schema = mongoose.Schema;
let rbID= {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Rubrique",
  default: null,
  //required: true,
},
const ContentSchema = new Schema({
  created: { type: Date, default: Date.now },
  titleFrench: { type: String, default: " " },
  titleEnglish: { type: String, default: " " },
  texteFrench: { type: String, default: null },
  texteEnglish: { type: String, default: null },
  videoUrl: { type: String, default: null },
  imageUrl: { type: String, default: null },
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
  rubriqueId: [rbID],
});
module.exports = mongoose.model("Content", ContentSchema);
