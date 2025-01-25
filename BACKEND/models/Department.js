const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    departmentId: {
      type: String,
      required: true,
      unique: true,
    },
    departmentPassword: { 
      type: String, 
      required: true 
    },
    complaints: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint"
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Department", departmentSchema);