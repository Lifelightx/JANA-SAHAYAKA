const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    aadhaar: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    tahsil: {
      type: String,
      required: true,
    },
    village: {
      type: String,
      required: true,
    },
    complaints: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Complaint'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
