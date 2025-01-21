const mongoose = require("mongoose");

// Order Schema
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "An order must belong to a user."],
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Each product must have an ID."],
      },
      quantity: {
        type: Number,
        required: [true, "Each product must have a quantity."],
      },
      price: {
        type: Number,
        required: [true, "Each product must have a price."],
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: [true, "An order must have a total price."],
  },
  shippingAddress: {
    type: String,
    required: [true, "An order must have a shipping address."],
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Order", orderSchema);
