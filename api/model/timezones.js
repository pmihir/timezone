const mongoose = require("mongoose");

const Timezone = mongoose.model(
  "Timezone",
  new mongoose.Schema({
    name: String,
    timeZone: String,
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
      }
    ]
  })
);
module.exports = Timezone;