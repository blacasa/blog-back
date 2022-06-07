var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var nodemailer = require('nodemailer');
const config = require('../config')
const contactModel = require('../model/Contact')

// Route de base /api/
router.post('/', upload.fields([]), function (req, res) {
  const data = JSON.parse(req.body.data)
  const contenu = data.message
  const expediteur = data.expediteur
  let transporter = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: true,
    auth: {
      user: config.mail.user,
      pass: config.mail.pwd
    }
  })
  message = {
    from: config.mail.sender,
    to: config.mail.destinator,
    subject: "[13jeuxsolo] Contact de " + expediteur,
    html: '<p>' + expediteur + ' a envoyé le message suivant: ' + '<br/>' + contenu + '</p>'
  }

  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log('ERRROR - send mail:', err)
      contactModel.addMessage(data, 'KO')
      res.status(400).json(err)
    } else {
      // console.log('mail sent', info);
      data.expediteur = ''
      contactModel.addMessage(data, 'OK')
      res.status(200).json('Mail sent')
    }
  })
});

module.exports = router;