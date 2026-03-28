const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        success: false,
        message: "Please try again with different email",
      });

    // 1234 - ajkaffussscsjii --> This is how the hasshed password looks like

    const hasshedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      phone,
      password: hasshedPassword,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET, //Secret key
      {
        expiresIn: "160d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const adminSignup = async (req, res) => {
  const { username, password } = req.body;

  try {
    let admin = await Admin.findOne({ username });

    if (admin)
      return res.status(400).json({
        success: false,
        message: "Please try again with different username ",
      });

    const securePassword = await bcrypt.hash(password, 10);

    admin = new Admin({
      username,
      password: securePassword,
    });

    await admin.save();

    return res.status(201).json({
      success: true,
      message: "Admin signup successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    let admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Please try again with different username ",
      });
    }

    const comparePassword = await bcrypt.compare(password, admin.password);

    if (!comparePassword)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "4d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Admin logged in",
      token,
      user: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------
const addPincodes = async (req, res) => {
  try {
    const { pincodes } = req.body;

    // basic validation
    if (!Array.isArray(pincodes) || pincodes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array 'pincodes' with at least one item",
      });
    }

    // optional: transform / validate each pincode
    const validated = pincodes.map((p) => {
      return { pincode: p.pincode };
    });

    // For now, we return them — later you can save to DB
    return res.status(200).json({
      success: true,
      message: "Pincodes added successfully",
      data: validated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// --------------------------------------

module.exports = { signup, login, adminSignup, adminLogin, addPincodes };
