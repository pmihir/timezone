const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
//   timeZones: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Timezone",
//     },
//   ]
  timeZone: [
    {
      name: String,
      timeZone: String,
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
