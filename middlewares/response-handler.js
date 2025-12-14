const responseHandler = (payload, req, res, next) => {
  const status = payload.status || 500;

  // Agar status 400 se kam hai to ye success hai
  const isSuccess = status >= 200 && status < 400;

  const response = {
    message: payload.message || (isSuccess ? "Success" : "Error"),
  };

  if (payload.data) response.data = payload.data;
  if (payload.extraMessage) response.extraMessage = payload.extraMessage;
  if (payload.id) response.id = payload.id;

  return res.status(status).json(response);
};

const responseMiddleware = (err, req, res, next) => {
  // ye handler error aur success dono ko handle karega
  responseHandler(err, req, res, next);
};

module.exports = responseMiddleware;