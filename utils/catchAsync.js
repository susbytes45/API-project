const catchAsync = (f1) => {
  return (req, res, next) => f1(req, res, next).catch((err) => next(err));
};
module.exports = catchAsync;
