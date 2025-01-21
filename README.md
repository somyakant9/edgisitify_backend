# Backend Project: edgisitify Platform

This is the backend service for the E-Commerce platform, built using Node.js, Express, and MongoDB. It provides APIs for user registration, login, product management, cart operations, and order placement.

## Features

- User authentication and authorization (JWT-based).
- Product management (CRUD operations).
- Cart operations add.
- Order placement with billing address.
- Error handling with custom error classes.
- CORS enabled for frontend-backend communication.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=8000
   DATABASE=<your-mongodb-connection-string>
   DATABASE_PASSWORD=<your-database-password>
   JWT_SECRET=<your-jwt-secret>
   JWT_EXPIRES_IN=2h
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:8000`.

## API Endpoints

### User Routes

#### Register a User
- **URL:** `/api/auth/register`
- **Method:** POST
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "user": { "id": "<userId>", "name": "John Doe", "email": "john.doe@example.com" }
    }
  }
  ```

#### Login a User
- **URL:** `/api/auth/login`
- **Method:** POST
- **Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "token": "<JWT-token>"
  }
  ```

### Product Routes

#### Get All Products
- **URL:** `/api/products`
- **Method:** GET
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "products": [
        { "id": "<productId>", "title": "Product 1", "price": 100, ... }
      ]
    }
  }
  ```

### Cart Routes

#### Add Item to Cart
- **URL:** `/api/cart`
- **Method:** POST
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <JWT-token>"
  }
  ```
- **Body:**
  ```json
  {
    "productId": "<productId>",
    "quantity": 2
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Item added to cart"
  }
  ```

### Order Routes

#### Place an Order
- **URL:** `/api/orders`
- **Method:** POST
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <JWT-token>"
  }
  ```
- **Body:**
  ```json
  {
    "billingAddress": "123 Main Street, City, Country"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Order placed successfully"
  }
  ```

## Folder Structure

```plaintext
backend/
├── controllers/
│   ├── authControllers.js
│   ├── productController.js
│   ├── cartControllers.js
│   ├── errControllers.js
│   └── orderControllers.js
├── models/
│   ├── userModels.js
│   ├── productModel.js
│   ├── cartModels.js
│   └── orderModel.js
├── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── orderRoutes.js
├── utils/
│   ├── appError.js
│   └── catchAsync.js
├── app.js
├── config.env
├── index.js
└── package.json
```

## Scripts

- **Start Development Server:** `npm run dev`
- **Start Production Server:** `npm start`

