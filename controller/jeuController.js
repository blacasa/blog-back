var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var jeuModel = require('../model/Jeu');
var formatter = require('../formatter/formatter')
const auth = require('../security/auth');
    
// Route de base /api/jeu
router.get('/', function (req, res) {
  jeuModel.getJeu(req.query.game).then(games => {
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
    // Link to Editeur
    jeuModel.linkToEditeurs(insertedId, data.editeur).then(() => {
      // Link to Auteur / Illustrateur
      return jeuModel.linkToPersonnalites(insertedId, data.auteurs, data.illustrateurs)
    }).then(() => {
      jeuModel.getJeu().then(games => { 
        formatter.formatJeux(games).then((jeux) => {
          res.status(200).json(jeux)
        });
      })
    })
  }).catch(err => {
    res.status(400).json(err)
  })
});

module.exports = router;