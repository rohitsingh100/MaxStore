const Razorpay = require("razorpay");
const crypto = require("crypto"); // ✅ missing import
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils"); //  correct path

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const generatePayment = async (req, res) => {
  const userId = req.id;

  // console.log("Payment user id ", userId);

  try {
    const { amount } = req.body; // ✅ amout → amount

    var options = {
      amount: amount * 100,
      currency: "INR",
      receipt: Math.random().toString(36).substring(2),
    };

    const user = await User.findById(userId); // ✅ user → User
    // console.log("find user", user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    instance.orders.create(options, async (err, order) => {
      if (err) {
        return res.status(500).json({ success: false, message: err });
      }

      return res.status(200).json({
        success: true,
        data: {
          ...order,
          name: user.name,
        },
      });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// const verifyPayment = async (req, res) => {
//   const userId = req.id;

//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature, // ✅ frontend se aana chahiye
//       amount,
//       productArray,
//       address,
//     } = req.body;

//     console.log("Key",process.env.RAZORPAY_KEY_SECRET);

//     // ✅ correct signature logic
//     const isValid = validatePaymentVerification(
//       {
//         order_id: razorpay_order_id,
//         payment_id: razorpay_payment_id,
//       },
//       razorpay_signature,
//       process.env.RAZORPAY_KEY_SECRET
//     );

//     if (!isValid) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Payment verification failed" });
//     }

//     for (const product of productArray) {
//       await User.findByIdAndUpdate(
//         // ✅ Upadte → Update
//         userId,
//         { $push: { purchasedProducts: product.id } }
//       );

//       await Product.findByIdAndUpdate(
//         // ✅ Upadte → Update
//         product.id,
//         { $inc: { stock: -product.quantity } }
//       );
//     }

//     await Order.create({
//       amount: amount / 100,
//       razorpayOrderId: razorpay_order_id,
//       razorpayPaymentId: razorpay_payment_id,
//       razorpaySignature: razorpay_signature,
//       products: productArray,
//       address: address,
//       userId: userId,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified",
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };



const verifyPayment = async (req, res) => {
  const userId = req.id;

  // console.log("User id ",userId)
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      productArray,
      address,
    } = req.body;


    // console.log(razorpay_order_id,razorpay_signature,razorpay_payment_id)
    // console.log("product array is",productArray)

    //  1. Basic validation
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    // 🔐 2. Signature verification (MOST IMPORTANT)
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // 🔁 3. Idempotency check (duplicate payment safety)
    const existingOrder = await Order.findOne({
      razorpayPaymentId: razorpay_payment_id,
    });

    if (existingOrder) {
      return res.status(200).json({
        success: true,
        message: "Payment already verified",
      });
    }

    // 📦 4. Stock + user update
    for (const product of productArray) {
      const dbProduct = await Product.findById(product.id);

      // console.log("Db product",dbProduct)

      if (!dbProduct || dbProduct.stock < product.quantity) {
        return res.status(400).json({
          success: false,
          message: `Product out of stock`,
        });
      }

      await Product.findByIdAndUpdate(product.id, {
        $inc: { stock: -product.quantity },
      });

      // await User.findByIdAndUpdate(userId, {
      //   $push: { purchasedProducts: product._id },
      // });

      await User.findByIdAndUpdate(userId, {
        $push: { purchasedProducts: product.id },
      });
    }


    // 🧾 5. Create order
    await Order.create({
      userId,
      amount: amount / 100, // paise → rupees
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      products: productArray,
      address,
      paymentStatus: "SUCCESS",
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });

  } catch (error) {
    console.error("Payment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



module.exports = { generatePayment, verifyPayment };
