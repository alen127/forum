const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../../config/config");
function authenticateToken(req, res, next) {
  const token = req.query.token;
  if (!token)
    return res.status(401).json({ message: "Authorization token not found" });

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({
        message: "Invalid token",
      });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
