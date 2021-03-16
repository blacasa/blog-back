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
      data.image,
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
  }
}

module.exports = articleModel