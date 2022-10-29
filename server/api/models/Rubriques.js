const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const RubriqueSchema = new Schema({
  created: { type: Date, default: Date.now },
  name: { type: String, required: true },
  level: { type: Number, require: true },
  parentId: { type: String, default: null },
});
module.exports = mongoose.model("Rubrique", RubriqueSchema);
