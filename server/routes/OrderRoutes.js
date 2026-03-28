const router = require("express").Router();
const {
  getOrderByUserId,
  getAllOders,
  getMetrics,
  updateOrderStatus,
} = require("../controllers/OrderController");
const verifyToken = require("../middlewares/verifyToken");
// const verifyToken = require("../middlewares/veryifyToken");

router.get("/get-orders-by-user-id", verifyToken, getOrderByUserId);

router.get("/get-all-orders", verifyToken, getAllOders);

router.get("/get-metrics", verifyToken, getMetrics);

router.put("/update-order-status/:paymentId", verifyToken, updateOrderStatus);

// router.put(
//   "/update-order-status/:paymentId",
//   updateOrderStatus
// );


module.exports = router;
