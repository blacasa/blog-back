
var articleModel = require('../model/Article');
var editeurModel = require('../model/Editeur');
const jeuModel = require('../model/Jeu');
var personnaliteModel = require('../model/Personnalite');

const formatter = {
  formatJeux: function (jeux, withArticle=true) {
    return new Promise((resolve, reject) => {
      jeux.forEach((jeu, index) => {
        jeu.personnalites = {}
        // Récupération des éditeurs
        editeurModel.getGameEditeur(jeu.id).then(editeurs => {
          jeu.editeurs = editeurs
        }).then(() => {
          // Récupération des articles
          if (withArticle) {
            articleModel.getArticleByGame(jeu.id).then(articles => {
              jeu.articles = articles
            })
          }
        }).then(() => {
          // Récupération des auteurs
          personnaliteModel.getGameAuthor(jeu.id).then(auteurs => {
            jeu.personnalites.auteurs = auteurs
          })
        }).then(() => {
          // Récupération des illustrateurs
          personnaliteModel.getGameIllustrator(jeu.id).then(illustrateurs => {
            jeu.personnalites.illustrateurs = illustrateurs
            if (index === jeux.length - 1) resolve(jeux);
          })
        }).catch(err => {
          reject(err)
        })
      });
    });
  },
  formatArticles: function (articles, withJeu=true) {
    return new Promise((resolve, reject) => {
      articles.forEach((article, index) => {
        article.jeu = {}
        // Récupération des articles
        if (withJeu) {
          jeuModel.getJeuByArticle(article.id).then(jeu => {
            this.formatJeux(jeu, false).then(jeu => {
              article.jeu = jeu[0]
              if (index === articles.length - 1) resolve(articles);
            })
          }).catch(err => {
            reject(err)
          })
        } else {
          resolve(articles);
        }
      })
    });
  }
}

module.exports = formatter