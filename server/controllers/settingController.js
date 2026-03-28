const { ROLES } = require("../utils/constants");
const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

const changeUsername = async (req, res) => {
  // console.log("req",req.role)
  // if (res.role !== ROLES.admin) {
  //   return res.status(401).json({ message: "Access denied" });
  // }


  try {
    const { previousUsername, newUsername } = req.body;

    if (!newUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username to change is required" });
    }

    const user = await Admin.findOneAndUpdate(
      {
        username: previousUsername,
      },
      { username: newUsername },
      { new: true }
    );

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Username does not exists" });

    return res.status(200).json({
      success: true,
      message: `New username is $(user.username)`,
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const changePassword = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({ success: false, message: "Access admin" });
  }
  try {
    const { username, previousUsername, newpassword } = req.body;

    if (!previousPassword || !newpassword) {
      return res.status(400).json({
        success: false,
        message: "Previois and new password is requied",
      });
    }

    let user = await Admin.finOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      previousPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Previous password is incorrect" });
    }

    const securePassword = await bcrypt.hash(newpassword, 10);

    user.password = securePassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { changePassword, changeUsername };
