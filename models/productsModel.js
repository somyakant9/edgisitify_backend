const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "A product should have a name."],
  },
  image: {
    type: String,
    required: [true, "A product should have a image."],
  },
  description: {
    type: String,
    required: [true, "A product should have a description."],
  },
  price: {
    type: Number,
    required: [true, "A product should have a price."],
  },
  stock: {
    type: Number,
    required: true,
    default: 1,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
