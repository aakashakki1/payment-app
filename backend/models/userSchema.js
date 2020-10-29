const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newUser = new Schema({
  email: { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
});

module.exports = mongoose.model("USER", newUser);
