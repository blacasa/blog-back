const db = require('../database')
const queries = require('../sql/jeu')

const jeuModel = {
  getJeu: function (textSearch) {
    const gameSearch = typeof textSearch === 'undefined' ? '' : textSearch
    let query = queries.allJeux()
    query += queries.filterByNom(gameSearch)

    return db.query(query).then( rows => {
      return rows
    });
  }
}

module.exports = jeuModel