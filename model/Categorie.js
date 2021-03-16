const db = require('../database')
const queries = require('../sql/categorie')

const categorieModel = {
  getCategories: function () {
    let query = queries.getCategories()

    return db.query(query).then( rows => {
      return rows
    });
  }
}

module.exports = categorieModel