const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Product = require("../models/productsModel");
const Cart = require('../models/cartModels');
const mongoose = require("mongoose");
exports.addToCart = catchAsync(async(req,res,next)=>{

    let {productId, quantity} = req.body;
    let userId = req.user.id;

    console.log(req.user);

    // Check product availability
    const product = await Product.findById(productId);
    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    if (product.stock < quantity) {
        return next(new AppError("Insufficient stock for the product", 400));
      }
  
      // Check if the product is already in the user's cart
      let cartItem = await Cart.findOne({ productId, userId });
      if (cartItem) {
        // Update quantity if the product already exists in the cart
        cartItem.quantity += quantity;
      } else {
        // Create a new cart item
        cartItem = new Cart({ productId, quantity, userId });
      }  
      await cartItem.save();

      res.status(200).json({
        status: "success",
        message: "Product added to cart successfully",
        data: {
          cartItem,
        },
      });
})

exports.getCartItems = catchAsync(async(req,res,next)=>{
    
  // console.log(req);
  const userId = req.user.id;
    const cartItems = await Cart.find({ userId });
    if(!cartItems){
        return new AppError('No items in the cart.',200);
    };

    res.status(200).json({
        status:'success',
        data:cartItems||[]
    })

})