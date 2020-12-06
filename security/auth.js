const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers['x-auth-token'];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const expires = decodedToken.exp;
    const currentTimestamp = Math.round(Date.now() / 1000)
    if (expires < currentTimestamp) {
      throw 'Token invalid';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};