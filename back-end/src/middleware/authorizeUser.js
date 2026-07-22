//to verify user roles

const authorizeUser = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role.roleName)) return next();
    else {
      return res.status(403).json({
        error: "Forbidden",
      });
    }
  };
};

export default authorizeUser;
