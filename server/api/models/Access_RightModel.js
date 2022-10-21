const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const RightSchema = new Schema({
  created: { type: Date, default: Date.now },
  role: { type: Number, required: true },
  description: { type: String, default: " " },
});
module.exports = mongoose.model("Right", RightSchema);
