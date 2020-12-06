const db = require('../database')
const queries = require('../sql/editeur')
let session = require('../session')

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
  },
  postEditeur: function (data) {
    const query = queries.insertEditeur()
    const params = [ data.code, data.libelle, session.email, session.email ]

    return db.query(query, params).then( row => {
      //const insertedId = row.insertId
      return row
    });
  }
}

module.exports = editeurModel