const db = require('../database')
const queries = require('../sql/stat')

const statModel = {
  getStats: function () {
    let query = queries.getStats()

    return db.query(query).then( rows => {
      return rows
    });
  },
  getViewStats: function () {
    let query = queries.getStats()

    return db.query(query).then( rows => {
      return rows
    });
  }
}

module.exports = statModel