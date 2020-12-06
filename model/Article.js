const db = require('../database')
const queries = require('../sql/article')

const articleModel = {
  getArticle: function (limit) {
    const queryLimit = typeof limit === 'undefined' ? null : limit
    let query = queries.allArticles()
    query += queries.filterByPublished()
    if (queryLimit !== null) {
      query += queries.limit(queryLimit)
    }

    return db.query(query).then( rows => {
      return rows
    });
  },
  getArticle: function () {
    let query = queries.allArticles()

    return db.query(query).then( rows => {
      return rows
    });
  },
  getArticleById: function (id) {
    let query = queries.allArticles()
    query += queries.filterById(id)

    return db.query(query).then( rows => {
      return rows
    });
  },
  getArticleByGame: function (gameId) {
    let query = queries.articleByGame(gameId)

    return db.query(query).then( rows => {
      return rows
    });
  },
  postArticle: function (data) {
    console.log('postArticle')
    let query = queries.insertArticle()
    let params = [
      data.titre,
      data.contenu,
      data.datePublication,
      data.positif,
      data.negatif,
      data.idJeu,
      data.image
    ]
    // Si data.id est défini, on est en mode misr à jour
    if (typeof data.id !== 'undefined') {
      console.log('Mode UPDATE')
      query = queries.updateArticle()
      params.push(data.id)
      console.log('query: ', query)
      console.log('params: ', params)
    }

    return db.query(query, params).then( row => {
      //const insertedId = row.insertId
      console.log(row)
      return row.insertId !== 0 ? row.insertId : data.id
    });
  }
}

module.exports = articleModel