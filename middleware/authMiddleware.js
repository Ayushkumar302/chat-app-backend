const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token = req.cookies?.token;

  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "default_secret_key"
      );

      req.user = decoded; // The payload has { id: user._id }
      next();
    } catch (error) {
      res.status(401).json({ msg: "Not authorized, token failed", status: false });
    }
  } else {
    res.status(401).json({ msg: "Not authorized, no token", status: false });
  }
};

module.exports = { protect };
