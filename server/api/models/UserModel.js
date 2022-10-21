const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const UserSchema = new Schema({
  created: { type: Date, default: Date.now },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  AccessRight: { type: Number, default: 10, required: true },
  accessRightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Right",
    required: true,
  },
  password: { type: String, required: true },
});
module.exports = mongoose.model("User", UserSchema);
