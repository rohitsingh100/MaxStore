const express = require("express");
const { signup, login, adminSignup, adminLogin } = require("../controllers/authControlller");
// const { addPincodes } = require("../controllers/pincodeController");
const router = express.Router();

// routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/admin-signup", adminSignup);
router.post("/admin-login", adminLogin);
// router.get("/get-all-orders", getAllOrders);

// router.get("/get-metrics", getMetrics);



// new route to add pincodes
// router.post("/add-pincodes", addPincodes);

module.exports = router;
