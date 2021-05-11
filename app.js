const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
const morgan = require('morgan');


const articleController = require('./controller/articleController')
const editeurController = require('./controller/editeurController')
const jeuController = require('./controller/jeuController')
const personnaliteController = require('./controller/personnaliteController')
const referenceController = require('./controller/referenceController')
const roleController = require('./controller/roleController')
const securityController = require('./security/securityController')
const statController = require('./controller/statController')
const typeController = require('./controller/typeController')

const app = express();

/*
 * Gestion des CORS
 * => l'api est ouverte
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, X-AUTH-TOKEN, stats');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));


// Routes
app.use(express.static(__dirname + '/front'));
app.use(express.static(__dirname + '/beta'));
app.use(express.static(__dirname + '/ttsolo'));
app.use(express.static(__dirname + '/images')); 

app.use('/api', securityController);
app.use('/api/articles', articleController);
app.use('/api/editeurs', editeurController);
app.use('/api/jeux', jeuController);
app.use('/api/personnalites', personnaliteController);
app.use('/api/references', referenceController);
app.use('/api/roles', roleController);
app.use('/api/stats', statController);
app.use('/api/types', typeController);

// Pour les images
app.get('/images/articles/*', function (req, res) {
  // res.sendFile(path.join(__dirname + '/front/index.html'));
  // console.log('/images',  __dirname + "/images/")
  req.params[0] ? res.status(200).sendFile(req.params[0], { root: __dirname + "/images/articles/" } ) : res.status(200);
});
app.get('/images/*', function (req, res) {
  // res.sendFile(path.join(__dirname + '/front/index.html'));
  // console.log('/images',  __dirname + "/images/")
  req.params[0] ? res.status(200).sendFile(req.params[0], { root: __dirname + "/images/" } ) : res.status(200);
});

// Pour "sous site" TT solo
app.get('/ttsolo/*', function (req, res) {
  res.status(200).sendFile('index.html', { root: __dirname + "/ttsolo/" } );
});

// Pour le mode beta du front 13jeuxsolo.fr
app.get('/beta/*', function (req, res) {
  // res.sendFile(path.join(__dirname + '/front/index.html'));
  // console.log('/*')
  res.status(200).sendFile('index.html', { root: __dirname + "/beta/" } );
});

// Pour le front 13jeuxsolo.fr
app.get('/*', function (req, res) {
  // res.sendFile(path.join(__dirname + '/front/index.html'));
  // console.log('/*')
  res.status(200).sendFile('index.html', { root: __dirname + "/front/" } );
});

module.exports = app;