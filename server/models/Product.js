const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    rating: {
      type: Number,
      default: 5,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    colors: {
      type: Array,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ["Keyboard", "Mouse", "Headset"],
      required: true, // ✅ FIXED
    },
  },
  { timestamps: true }
);

/* =============================
   ⭐ FIXED calculateRating METHOD
   ============================= */
productSchema.methods.calculateRating = async function () {
  const Review = mongoose.model("Review"); // ✅ import safely

  const reviews = await Review.find({ productId: this._id }); // ✅ _id

  if (reviews.length > 0) {
    const totalRating = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    this.rating = totalRating / reviews.length;
  } else {
    this.rating = 5;
  }

  // ❌ DO NOT SAVE HERE
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
