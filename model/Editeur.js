const db = require('../database')
const queries = require('../sql/editeur')

const editeurModel = {
  getEditeur: function () {
    let query = queries.allEditeurs()

    return db.query(query).then( rows => {
      return rows
    });
  },
  getGameEditeur: function(gameId) {
    let query = queries.editeurByGame(gameId)

    return db.query(query).then( rows => {
      return rows
    });
  }
}

module.exports = editeurModel