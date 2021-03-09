var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var jeuModel = require('../model/Jeu');
var statsModel = require('../model/Stats');
var formatter = require('../formatter/formatter')
const auth = require('../security/auth');
    
// Route de base /api/jeux
router.get('/', function (req, res) {
  let page = '/api/jeux'
  const game = typeof req.query.game === 'undefined' ? undefined : req.query.game
  if (typeof game !== 'undefined') {
    page += '?game='+game
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
  // On note la page de recherche de jeu.
  jeuModel.getJeu(game).then(games => {
    // Pour chaque jeu:
    formatter.formatJeux(games).then((jeux) => {
      res.status(200).json(jeux)
    });
  }).catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
});
router.post('/', upload.fields([]), auth, function (req, res) {
  const data = JSON.parse(req.body.data)
  jeuModel.postJeu(data).then(insertedId => {
    // console.log('postJeu.then')
    // Link to Editeur
    jeuModel.linkToEditeurs(insertedId, data.editeur).then(() => {
      // console.log('linkToEditeur.then')
      // Link to Auteur / Illustrateur
      return jeuModel.linkToPersonnalites(insertedId, data.auteurs, data.illustrateurs)
    }).then(() => {
      // console.log('linkToPersonnalite.then')
      jeuModel.linkToType(insertedId, data.types).then(() => {
        jeuModel.getJeu().then(games => { 
          formatter.formatJeux(games).then((jeux) => {
            // console.log('formatJeux.then')
            res.status(200).json(jeux)
          })
        })
      })
    })
  }).catch(err => {
    res.status(400).json(err)
  })
});

module.exports = router;