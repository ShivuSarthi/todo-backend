const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "No token found, Authorization is denied." });
  try {
    const decode = jwt.verify(token, "secret");
    req.user = decode.user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Token is not valid" });
  }
};
