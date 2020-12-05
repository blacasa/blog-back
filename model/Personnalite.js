const db = require('../database')
const queries = require('../sql/personnalite')

const personnaliteModel = {
  getPersonnalite: function () {
    let query = queries.allPersonnalites()

    return db.query(query).then( rows => {
      return rows
    });
  }
}

module.exports = personnaliteModel