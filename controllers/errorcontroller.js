const AppError = require('./../appError');
const handleCastError = (err) => {
  const message = `invalid ${err.path}:${err.value}.`;
  console.log(message);
  return new AppError(message, 400);
};
const handleduplicatefields = (err) => {
  const value = err.keyValue.name;
  console.log(value);

  err = new AppError(
    `duplicate value of ${value} already exsist please enter another value`,
    400,
  );
  return err;
};
const handlevalidationerror = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};
const senderrdev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const senderrprod = (err, res) => {
  if (err.isOperational) {
    // operational error we trust
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('from sendprod');
    // console.error(`ERROR`, err);
    // programming or other error
    res.status(500).json({
      status: 'error',
      message: 'something went wrong',
    });
  }
};

const globalerroorHandler = (err, req, res, next) => {
  //   console.log(err.statusCode);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'devlopment') {
    senderrdev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    console.log('from global');

    let error = { ...err };
    // console.log(error);
    if (err.name === 'CastError') {
      error = handleCastError(error);
      console.log(error, `castError`);
    }
    if (err.code === 11000) {
      error = handleduplicatefields(error);
      console.log(error, `duplicatefields`);
    }
    if (err.name === 'ValidationError') {
      console.log('validation ');
      error = handlevalidationerror(error, 'validation');
    }
    senderrprod(error, res);
  }
};
module.exports = globalerroorHandler;
