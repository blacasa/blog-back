var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var jwt = require('jsonwebtoken')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var security = require('../security/security');
const config = require('../config')

// Route de base /api
router.post('/auth-tokens', upload.fields([]), function (req, res) {
  console.log('post auth-tokens:', JSON.parse(req.body.data));
  const loginForm = JSON.parse(req.body.data)
  security.login(loginForm.login, loginForm.password).then(user => {
    console.log(user)
    if (user) {
      // On génère un token, on le stocke en base, et on le renvoi
      const token = jwt.sign(
        {
          userId: user.id,
          mail: user.email
        },
        config.jwt_secret,
        { expiresIn: '24h'}
      )
      res.status(200).json({
        token: token
      })
    } else {
      res.status(400).json('Login failed')
    }
  }).catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
});
router.post('/register', upload.fields([]), function (req, res) {
  console.log('post register:', JSON.parse(req.body.data));
  const loginForm = JSON.parse(req.body.data)
  security.register(loginForm.login, loginForm.password).then(user => {
    res.status(200).json(user)
  }).catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
});

module.exports = router;