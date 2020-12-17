const db = require('../database')
const queries = require('../sql/type')

const typeModel = {
  getType: function () {
    let query = queries.allTypes()

    return db.query(query).then( rows => {
      return rows
    });
  },
  getGameType: function (gameId) {
    let query = queries.typeByGame()

    return db.query(query, [ gameId ]).then( rows => {
      return rows
    });
  }
}

module.exports = typeModel