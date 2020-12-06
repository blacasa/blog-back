var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var personnaliteModel = require('../model/Personnalite');
const auth = require('../security/auth');

// Route de base /api/personnalite
router.get('/', function (req, res) {
  personnaliteModel.getPersonnalite().then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(400).json(err)
  })
});
router.post('/', upload.fields([]), auth, function (req, res) {
  const data = JSON.parse(req.body.data)
  personnaliteModel.postPersonnalite(data).then(data => {
    personnaliteModel.getPersonnalite().then(data => {
      res.status(200).json(data)
    })
  }).catch(err => {
    res.status(400).json(err)
  })
});

module.exports = router;