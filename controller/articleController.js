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

// Route de base /api/article
router.get('/', function (req, res) {
  console.log('route /')
  // On note la page d'accueil.
  const limit = typeof req.query.limit === 'undefined' ? null : req.query.limit
  let page = '/api/article'
  if (limit !== null) {
    page += '?limit='+limit
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
  articleModel.getArticleLigthContent(limit).then(data => {
    formatter.formatArticles(data).then((articles) => {
      articles.forEach(article => {
        if (typeof article.jeu === 'undefined'
          || typeof article.jeu.id === 'undefined'
          || article.jeu === null) {
          console.log('ERREUR: jeu manquant sur article ' + article.id + ' (id jeu: ' + article.idJeu + ')')
           article.jeu = null
        }
      });
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
      articles.forEach(article => {
        if (typeof article.jeu === 'undefined'
          || typeof article.jeu.id === 'undefined'
          || article.jeu === null) {
          console.log('ERREUR: jeu manquant sur article ' + article.id + ' (id jeu: ' + article.idJeu + ')')
           article.jeu = null
        }
      });
      res.status(200).json(articles)
    });
  }).catch(err => {
    res.status(400).json(err)
  })
});
router.get('/:id', function (req, res) {
  console.log('route /' + req.params.id)
  //console.log(req.headers.origin, req.headers.referer);
  // On note la visite de l'article.
  const callData = {
    origin: req.headers.origin,
    referer: req.headers.referer
  }
  let stats = req.headers.stats;
  if (stats) {
    stats = JSON.parse(stats)
  }
  statsModel.addVisit('/api/article/'+req.params.id, callData, stats)
  articleModel.getArticleById(req.params.id).then(data => {
    formatter.formatArticles(data).then((articles) => {
      articles.forEach(article => {
        if (typeof article.jeu === 'undefined'
          || typeof article.jeu.id === 'undefined'
          || article.jeu === null) {
          console.log('ERREUR: jeu manquant sur article ' + article.id + ' (id jeu: ' + article.idJeu + ')')
           article.jeu = null
        }
      });
      res.status(200).json(articles[0])
    });
  }).catch(err => {
    res.status(400).json(err)
  })
});
router.post('/', upload.fields([]), auth, function (req, res) {
  const data = JSON.parse(req.body.data)
  // console.log('POST article')
  articleModel.postArticle(data).then(insertedId => {
    articleModel.linkToCategories(insertedId, data.categories).then(() => {
      // console.log('POST then')
      articleModel.getArticle().then(data => {
        formatter.formatArticles(data).then((articles) => {
          res.status(200).json(articles)
        });
      })
    })
  }).catch(err => {
    res.status(400).json(err)
  })
});

module.exports = router;