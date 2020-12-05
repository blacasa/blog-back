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
  }
}

module.exports = articleModel