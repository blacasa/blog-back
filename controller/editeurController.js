var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var editeurModel = require('../model/Editeur');

// Route de base /api/jeu
router.get('/', function (req, res) {
  editeurModel.getEditeur().then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(400).json(err)
  })
});

module.exports = router;