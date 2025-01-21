const mongoose = require("mongoose");

// Cart Schema
const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "A cart item must have a product ID."],
  },
  quantity: {
    type: Number,
    required: [true, "A cart item must have a quantity."],
    default: 1,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A cart item must have a user ID."],
  },
});

module.exports = mongoose.model("Cart", cartSchema);
