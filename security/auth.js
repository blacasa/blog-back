const jwt = require('jsonwebtoken');
const config = require('../config')
let session = require('../session')

module.exports = (req, res, next) => {
  try {
    // On splir sur espace et on prend la seconde partie ( la première étant "Bearer")
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.jwt_secret);
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