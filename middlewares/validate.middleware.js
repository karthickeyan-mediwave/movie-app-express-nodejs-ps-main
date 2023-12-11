const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    // return next({
    //   status: 400,
    //   message: error.details.map((d) => d.message),
    // });
    return res
      .status(400)
      .json({ message: error.details.map((d) => d.message) });
  }
  req.body = value;
  next();
};

module.exports = {
  validate,
};
