const db = require('../database')
const queries = require('../sql/personnalite')
let session = require('../session')

const personnaliteModel = {
  getPersonnalite: function () {
    let query = queries.allPersonnalites()

    return db.query(query).then( rows => {
      return rows
    });
  },
  getGameAuthor: function (gameId) {
    let query = queries.auteurByGame()

    return db.query(query, [ gameId ]).then( rows => {
      return rows
    });
  },
  getGameIllustrator: function (gameId) {
    let query = queries.illustrateurByGame()

    return db.query(query, [ gameId ]).then( rows => {
      return rows
    });
  },
  postPersonnalite: function (data) {
    const query = queries.insertPersonnalite()
    const params = [ data.nom, data.prenom, session.email, session.email ]

    return db.query(query, params).then( row => {
      //const insertedId = row.insertId
      return row
    });
  }
}

module.exports = personnaliteModel