const router = require("express").Router();
const {
  createProduct,
  updateProduct,
  getProductByName,
  getProducts,
  deleteProduct,
  blacklistProduct,
  removeFromBlacklist,
} = require("../controllers/productController");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/multer");
// const { getProductByName } = require("../controllers/productController");

router.post(
  "/create-product",
  verifyToken,
  upload.array("images", 4),
  createProduct
);

router.put("/update-product/:id", verifyToken, updateProduct);

router.delete("/delete-product/:id", verifyToken, deleteProduct);

router.get("/get-product-by-name/:name", getProductByName);

router.put("/blacklist-product/:id", verifyToken, blacklistProduct);

router.put("/remove-from-blacklist/:id", verifyToken, removeFromBlacklist);

router.get("/get-products", getProducts);




// router.get("/get-product-by-name/:name", getProductByName);


module.exports = router;
