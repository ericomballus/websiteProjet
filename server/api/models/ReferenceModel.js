const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ReferenceSchema = new Schema({
  created: { type: Date, default: Date.now },
  nameFr: { type: String, required: true },
  nameEn: { type: String, required: true },
});
module.exports = mongoose.model("Reference", ReferenceSchema);
