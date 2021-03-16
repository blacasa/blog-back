var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var articleModel = require('../model/Article');
var categorieModel = require('../model/Categorie')

// Route de base /api/references
router.get('/', function (req, res) {
  let references = {
    'nbPublishedArticles': 0,
    'categories': []
  }
  articleModel.getCountArticles().then(nbPublishedArticles => {
    references.nbPublishedArticles = nbPublishedArticles
    return categorieModel.getCategories()
  }).then(categories => {
    references.categories = categories
    res.status(200).json(references)
  }).catch(err => {
    res.status(400).json(err)
  })
});

module.exports = router;