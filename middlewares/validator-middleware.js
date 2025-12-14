const uservalidate = (sechma) => async (req, res, next) => {
  try {
    const parseBody = await sechma.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const status = 422;
    const message = err.errors[0].message;
    const error = { status, message };
    next(error);
  }
};
module.exports = uservalidate;
