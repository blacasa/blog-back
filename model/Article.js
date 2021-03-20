const db = require('../database')
const queries = require('../sql/article')
let session = require('../session')

const articleModel = {
  getArticle: function (limit) {
    const queryLimit = typeof limit === 'undefined' ? null : limit
    let query = queries.allArticles()
    query += queries.filterByPublished()
    query += queries.groupByContact()
    query += queries.orderByPublishedDate()
    if (queryLimit !== null) {
      query += queries.limit(queryLimit)
    }

    return db.query(query).then( rows => {
      return rows
    });
  },
  getArticleLigthContent: function (limit) {
    const queryLimit = typeof limit === 'undefined' ? null : limit
    let query = queries.allArticlesLigthContent()
    query += queries.filterByPublished()
    query += queries.groupByContact()
    query += queries.orderByPublishedDate()
    if (queryLimit !== null) {
      query += queries.limit(queryLimit)
    }

    return db.query(query).then( rows => {
      return rows
    });
  },
  getArticleById: function (id) {
    let query = queries.allArticles()
    query += queries.filterById(id)
    query += queries.groupByContact()
    query += queries.orderByPublishedDate()

    return db.query(query).then( rows => {
      return rows
    });
  },
  getArticleByGame: function (gameId) {
    let query = queries.articleByGame()
    query += queries.orderByPublishedDate()

    return db.query(query, [ gameId ]).then( rows => {
      return rows
    });
  },
  getCountArticles: function () {
    let query = queries.countArticle()
    query += queries.orderByPublishedDate()
    return db.query(query).then(rows => {
      // console.log(rows[0].nbPublishedArticles)
      return rows[0].nbPublishedArticles
    });
  },
  postArticle: function (data) {
    let query = queries.insertArticle()
    let params = [
      data.titre,
      data.contenu,
      data.datePublication,
      data.positif,
      data.negatif,
      data.idJeu,
      session.email
    ]
    // Si data.id est défini, on est en mode misr à jour
    if (typeof data.id !== 'undefined') {
      query = queries.updateArticle()
      params.push(data.id)
    } else {
      // Auteur de création
      params.push(session.email)
    }

    return db.query(query, params).then( row => {
      //const insertedId = row.insertId
      return row.insertId !== 0 ? row.insertId : data.id
    });
  },
  linkToCategories: function (articleId, categories) {
    const categorieIds = categories.split(',');

    return this.unlinkArticleCategorie(articleId).then(() => {
      return this.linkArticleCategorie(articleId, categorieIds).then( row => {
        return row.insertId
      });
    })
  },
  unlinkArticleCategorie: function (articleId) {
    const deleteQuery = queries.unlinkArticleCategorie()
    const deleteParams = [
      articleId
    ]
    return db.query(deleteQuery, deleteParams).then( row => {
      return articleId;
    }).catch(err => {
      reject(err)
    })
  },
  linkArticleCategorie: function (articleId, categorieIds) {
    if (categorieIds === null) return new Promise(resolve => resolve())
    return new Promise((resolve, reject) => {
      let cpt = 0
      categorieIds.forEach(categorieId => {
        const query = queries.linkArticleCategorie()
        const params = [
          articleId,
          categorieId
        ]
        db.query(query, params).then(row => {
          cpt++
          if (cpt === categorieIds.length) resolve(articleId);
        }).catch(err => {
          reject(err)
        })
      })
    });
  }
}

module.exports = articleModel