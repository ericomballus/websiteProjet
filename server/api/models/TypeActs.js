const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const TypeActSchema = new Schema({
  created: { type: Date, default: Date.now },
  nameFr: { type: String, required: true },
  nameEn: { type: String, required: true },
});
module.exports = mongoose.model("TypAct", TypeActSchema);
