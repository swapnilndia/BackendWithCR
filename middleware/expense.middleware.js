const jwt = require("jsonwebtoken");

function isTokenExpired(expirationTimestamp) {
  const currentTime = Math.floor(Date.now() / 1000);
  return expirationTimestamp < currentTime;
}

async function expenseMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: "Authorization header missing" });
    }

    const access_token = token.split(" ")[1];
    const decodedToken = await jwt.verify(access_token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(400).json({ msg: "Invalid token" });
    }
    const isExpired = isTokenExpired(decodedToken.exp);
    if (isExpired) {
      return res.status(400).json({ msg: "Token has expired" });
    }
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
}
module.exports = { expenseMiddleware };
