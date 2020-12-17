var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var articleModel = require('../model/Article');

// Route de base /api/references
router.get('/', function (req, res) {
  articleModel.getCountArticles().then(nbPublishedArticles => {
    res.status(200).json({ 'nbPublishedArticles': nbPublishedArticles })
  }).catch(err => {
    res.status(400).json(err)
  })
});

module.exports = router;