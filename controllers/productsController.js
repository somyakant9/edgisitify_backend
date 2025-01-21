const Product = require("../models/productsModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllProduct = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    results: products.length,
    data: { products },
  });
});

exports.addNewProduct = catchAsync(async (req, res, next) => {
  const { title, image, description,price, stock } = req.body;

  const newProduct = await Product.create({
    title,
    image,
    description,
    price,
    stock,
  });

  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res,next) => {

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if(!product){
      return new AppError('No product found with the ID',404)
    };

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {

  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return new AppError("No product found with the ID", 404);
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.deleteAllProducts = catchAsync(async (req, res, next) => {
  await Product.deleteMany();

  res.status(204).json({
    status: "success",
    message: "All products deleted successfully",
  });
});
