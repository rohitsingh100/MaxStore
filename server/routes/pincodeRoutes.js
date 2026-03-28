const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const {addNewPincodes, getPincode} = require("../controllers/pincodeController")

router.post("/add-pincodes", verifyToken,addNewPincodes );

router.get("/get-pincodes/:pincode", getPincode);

module.exports = router;
