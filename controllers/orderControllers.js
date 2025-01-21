const AppError = require("../utils/appError");
const Cart = require("../models/cartModels");
const Order = require("../models/orderModel");
const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productsModel");

exports.orders = catchAsync(async (req, res, next) => {
  const { shippingAddress } = req.body;
  const userId = req.user;
  console.log(userId);

  // Validate input
  if (!shippingAddress) {
    return next(new AppError("Shipping address is required.", 400));
  }

  // Retrieve user's cart
  const cartItems = await Cart.find({ userId }).populate("productId");

  if (!cartItems.length) {
    return next(new AppError("Your cart is empty.", 400));
  }

  // Calculate total price and validate product stock
  let totalPrice = 0;
  const products = [];

  for (const item of cartItems) {
    const { productId, quantity } = item;
    const product = item.productId;

    if (product.stock < quantity) {
      return next(
        new AppError(`Insufficient stock for product: ${product.title}`, 400)
      );
    }

    totalPrice += product.price * quantity;
    products.push({
      productId: product._id,
      quantity,
      price: product.price,
    });
  }

  // Create the order
  const order = await Order.create({
    userId,
    products,
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    shippingAddress,
    paymentStatus: "Pending",
    orderStatus: "Pending",
  });

  // Update product stock
  for (const item of cartItems) {
    const { productId, quantity } = item;
    await Product.findByIdAndUpdate(
      productId,
      {
        $inc: { stock: -quantity },
      },
      { new: true, runValidators: true }
    );
  }

  // Clear the user's cart
  await Cart.deleteMany({ userId });

  res.status(201).json({
    status: "success",
    message: "Order placed successfully.",
    data: {
      order,
    },
  });
});
