const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const VisitorSchema = new Schema({
  DateDebutVisite: { type: Date, default: Date.now },
  DateFinVisite: { type: Date, default: Date.now },
  visitorIP: { type: String, default: " " },
  moreInfo: { type: Object, default: {} },
});
module.exports = mongoose.model("Visitor", VisitorSchema);
