const express = require("express");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errControllers");
const productRouter = require("./routes/productsRoutes");
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/ordersRoutes");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors);

app.get('/',(req,res)=>{
  console.log('API is running')
});
app.use("/api/auth", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
