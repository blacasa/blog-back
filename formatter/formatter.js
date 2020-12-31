
var articleModel = require('../model/Article');
var editeurModel = require('../model/Editeur');
const jeuModel = require('../model/Jeu');
var personnaliteModel = require('../model/Personnalite');
const typeModel = require('../model/Type');

const formatter = {
  formatJeux: function (jeux, withArticle=true) {
    const allGamePromises = jeux.map((jeu, index) => {
      jeu.personnalites = {}
      const editeurPromise = editeurModel.getGameEditeur(jeu.id)
      const articlePromise = withArticle ? articleModel.getArticleByGame(jeu.id) : null
      const typePromise = typeModel.getGameType(jeu.id)
      const auteurPromise = personnaliteModel.getGameAuthor(jeu.id)
      const illustrateurPromise = personnaliteModel.getGameIllustrator(jeu.id)
      const gamePromises = [
        editeurPromise,
        articlePromise,
        typePromise,
        auteurPromise,
        illustrateurPromise
      ]
      return Promise.all(gamePromises).then(results => {
        jeu.editeurs = results[0]
        if (withArticle) {
          jeu.articles = results[1]
        }
        jeu.types = results[2]
        jeu.personnalites.auteurs = results[3]
        jeu.personnalites.illustrateurs = results[4]
        return new Promise(resolve => {
          resolve(jeu)
        })
      }).catch(err => {
        reject(err)
      });
    });
    return Promise.all(allGamePromises)
  },
  formatArticles: function (articles, withJeu=true) {
    return new Promise((resolve, reject) => {
      articles.forEach((article, index) => {
        article.jeu = {}
        // Récupération des articles
        if (withJeu) {
          jeuModel.getJeuByArticle(article.id).then(jeuArticle => {
            this.formatJeux(jeuArticle, false).then(jeu => {
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