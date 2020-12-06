const jwt = require('jsonwebtoken');
const config = require('../config')
let session = require('../session')

module.exports = (req, res, next) => {
  try {
    const token = req.headers['x-auth-token'];
    const decodedToken = jwt.verify(token, config.jwt_secret);
    console.log('TOKEN VALIDATION:')
    console.log(decodedToken.mail)
    const expires = decodedToken.exp;
    const currentTimestamp = Math.round(Date.now() / 1000)
    if (expires < currentTimestamp) {
      throw 'Token invalid';
    } else {
      session.setEmail(decodedToken.mail)
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};