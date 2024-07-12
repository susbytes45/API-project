const express = require('express');
const app = express();
// const fs = require("fs");
const morgan = require('morgan');
const globalerroorHandler = require('./controllers/errorcontroller');

const productRouter = require('./Routes/productroutes');
const userRouter = require('./Routes/userroutes');
const AppError = require('./appError');
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

app.all('*', (req, res, next) => {
  console.log('running for global route handler');
  // console.trace();
  // return res.status(404).json({
  //   status: 'fail',
  //   meassage: `Cant  find ${req.originalUrl} on this server`,
  // });
  const err = new AppError(
    `Cant find the ${req.originalUrl} on this route `,
    400,
  );

  next(err);
});
// app.get("/api/v1/products");
// app.post("/api/v1/products", craeteProducts);
// app.get("/api/v1/products/:id", getproduct);
// app.patch("/api/v1/products/:id", updateProducts);
// app.delete("/api/v1/products/:id", deleteProducts);

// app.listen(8001, () => {
//   console.log("listenong at port 8001");
// });
app.use(globalerroorHandler);
module.exports = app;
