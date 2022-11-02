const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ActeSchema = new Schema({
  created: { type: Date, default: Date.now },
  titleFrench: { type: String, default: " " },
  titleEnglish: { type: String, default: " " },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
    required: true,
  },
  reference: { type: Number, required: true }, //firstlady
  imageURL: { type: String, required: true },
  docUrl: { type: String, required: true },
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
