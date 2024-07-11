const express = require('express');
const app = express();
// const fs = require("fs");
const morgan = require('morgan');

const productRouter = require('./Routes/productroutes');
const userRouter = require('./Routes/userroutes');
// console.log(products);
// console.log(__dirname);
app.use(express.json());
if (process.env.NODE_ENV === 'devlopment') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  console.log('hello from the middleware before route handler');
  // req.requestname = "get post patch delete";
  next();
});

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
// app.get("/api/v1/products");
// app.post("/api/v1/products", craeteProducts);
// app.get("/api/v1/products/:id", getproduct);
// app.patch("/api/v1/products/:id", updateProducts);
// app.delete("/api/v1/products/:id", deleteProducts);

// app.listen(8001, () => {
//   console.log("listenong at port 8001");
// });
module.exports = app;
