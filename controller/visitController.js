var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var articleModel = require('../model/Article');
var statsModel = require('../model/Stats');
var formatter = require('../formatter/formatter')
const auth = require('../security/auth');

// Route de base /api/visit
router.get('/', function (req, res) {
  // On note la page d'accueil.
  const type = typeof req.query.type === 'undefined' ? null : req.query.type
  let page = '/api/visit'
  if (type !== null) {
    page += '?type='+type
  }
  const callData = {
    origin: req.headers.origin,
    referer: req.headers.referer
  }
  let stats = req.headers.stats;
  if (stats) {
    stats = JSON.parse(stats)
  }
  statsModel.addVisit(page, callData, stats)
  res.status(200).json('OK')
});

module.exports = router;