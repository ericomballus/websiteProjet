const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ActeSchema = new Schema({
  created: { type: Date, default: Date.now },
  titleFrench: { type: String, default: " " },
  titleEnglish: { type: String, default: " " },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  refID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TypAct",
    required: true,
  },
  imageFr: { type: String, required: true },
  imageEn: { type: String },
  docEn: { type: String },
  docFr: { type: String, required: true },
});
module.exports = mongoose.model("actes", ActeSchema);
/*
reference code : 
1- lois,
2- ordonnances
3- decrets
4- arrétés
5- circulaire
6- décision
*/
