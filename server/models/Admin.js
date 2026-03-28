const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin", // ✅ quotes me likha hua
  },
});

module.exports = mongoose.model("Admin", adminSchema);


// const mongoose = require("mongoose");

// const adminSchema = mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },

//     role: String,
//     default: "admin",
//     enum: ["admin"],
//   },
//   { timestamps: true }
// );

// const Admin = mongoose.model("Admin", adminSchema);

// module.exports = Admin;
