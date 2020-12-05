var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var jeuModel = require('../model/Jeu');
var editeurModel = require('../model/Editeur');

// Route de base /api/jeu
router.get('/', function (req, res) {
  jeuModel.getJeu(req.query.game).then(jeux => {
    // Pour chaque jeu:
    jeux.forEach(jeu => {
      console.log(jeu)
      // Récupération des éditeurs
      editeurModel.getGameEditeur(jeu.id).then(editeurs => {
        console.log(editeurs)
        //res.status(200).json(data)
      }).catch(err => {
        res.status(400).json(err)
      })
      // Récupération des personnalités
      // Récupération des articles
    });
    res.status(200).json(jeux)
  }).catch(err => {
    res.status(400).json(err)
  })
});
/*
router.post('/', function (req, res) {
    Matiere.creatematiere(req.body,function(err,count){
        if(err)
        {
            res.status(400).json(err);
        }
        else{
            res.json(req.body);
        }
    });
});
// */

module.exports = router;