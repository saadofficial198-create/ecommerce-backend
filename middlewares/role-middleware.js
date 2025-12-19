// Middleware to restrict access based on user role
const roleMiddleware = (roles = []) => {
  return (req, res, next) => {
    // req.user must exist
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};

module.exports = roleMiddleware;
