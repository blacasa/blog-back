const express = require('express');
const bodyParser = require('body-parser');

const articleController = require('./controller/articleController')
const editeurController = require('./controller/editeurController')
const jeuController = require('./controller/jeuController')
const personnaliteController = require('./controller/personnaliteController')
const roleController = require('./controller/roleController')
const securityController = require('./security/securityController')

const app = express();

/*
 * Gestion des CORS
 * => l'api est ouverte
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, X-AUTH-TOKEN');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

// Routes 
app.use('/api', securityController);
app.use('/api/article', articleController);
app.use('/api/editeur', editeurController);
app.use('/api/jeu', jeuController);
app.use('/api/personnalite', personnaliteController);
app.use('/api/role', roleController);


module.exports = app;