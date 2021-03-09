
var articleModel = require('../model/Article');
var editeurModel = require('../model/Editeur');
const jeuModel = require('../model/Jeu');
var personnaliteModel = require('../model/Personnalite');
const typeModel = require('../model/Type');

const formatter = {
  formatJeux: function (jeux, withArticle=true) {
    //return new Promise((resolve, reject) => {
      const allGamePromises = jeux.map((jeu, index) => {
        // console.log('-> map', jeu.id)
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
          // console.log(jeu.id + ' => fin de toutes les promesses')
          //console.log(jeu.personnalites)
          jeu.editeurs = results[0]
          if (withArticle) {
            jeu.articles = results[1]
          }
          jeu.types = results[2]
          jeu.personnalites.auteurs = results[3]
          jeu.personnalites.illustrateurs = results[4]
          //console.log(jeu.personnalites)
          //console.log(index, jeux.length - 1)
          return new Promise(resolve => {
            resolve(jeu)
          })
          if (index === jeux.length - 1) {
            // console.log('=> resolve !!!')
            //resolve(jeux);
          }
        }).catch(err => {
          reject(err)
        });
        
//        allGamePromises.push(jeuPromise)
      });
      // console.log('apres map', updatedJeux)
      return Promise.all(allGamePromises)/*.then(function(games) {
        // console.log(results)
        return resolve(games)
      })*/
      //return new Promise(resolve => resolve(updatedJeux))
      /*
      Promise.all(allGamePromises).then(values => {
        console.log('then allGamePromises')
      })
      */
//    });
  },
  formatArticles: function (articles, withJeu=true) {
	let cpt = 0;
    return new Promise((resolve, reject) => {
      articles.forEach((article, index) => {
        article.jeu = {}
        // Récupération des articles
        if (withJeu) {
          jeuModel.getJeuByArticle(article.id).then(jeuArticle => {
            this.formatJeux(jeuArticle, false).then(jeu => {
              // console.log('--> then post formatJeux')
      			  cpt++
              article.jeu = jeu[0]
              if (cpt === articles.length) resolve(articles);
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