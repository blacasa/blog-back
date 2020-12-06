var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var articleModel = require('../model/Article');
var formatter = require('../formatter/formatter')
const auth = require('../security/auth');

// Route de base /api/article
router.get('/', function (req, res) {
  console.log('route /')
  articleModel.getArticle(req.query.limit).then(data => {
    formatter.formatArticles(data).then((articles) => {
      res.status(200).json(articles)
    });
  }).catch(err => {
    res.status(400).json(err)
  })
});
router.get('/all', function (req, res) {
  console.log('route /all')
  articleModel.getArticle().then(data => {
    formatter.formatArticles(data).then((articles) => {
      res.status(200).json(articles)
    });
  }).catch(err => {
    res.status(400).json(err)
  })
});
router.get('/:id', function (req, res) {
  console.log('route /'+req.params.id)
  articleModel.getArticleById(req.params.id).then(data => {
    formatter.formatArticles(data).then((articles) => {
      res.status(200).json(articles[0])
    });
  }).catch(err => {
    res.status(400).json(err)
  })
});
router.post('/', upload.fields([]), auth, function (req, res) {
  const data = JSON.parse(req.body.data)
  console.log('post article:', data)
  articleModel.postArticle(data).then(insertedId => {
    articleModel.getArticle().then(data => {
      formatter.formatArticles(data).then((articles) => {
        res.status(200).json(articles)
      });
    })
  }).catch(err => {
    res.status(400).json(err)
  })
});

module.exports = router;