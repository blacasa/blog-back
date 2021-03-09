const db = require('../database')
const queries = require('../sql/stats')

const statModel = {
  addVisit: function (page, data, stats) {
    let query = queries.insertPageVisit()
    if (!stats) {
      stats = {
        country: 'Inconnu',
        region: 'Inconnu',
        city: 'Inconnu'
      }
    }
    const params = [page, JSON.stringify(data), stats.country, stats.region, stats.city]
    console.log(params)

    return db.query(query, params).then( row => {
      //const insertedId = row.insertId
      return row.insertId !== 0 ? row.insertId : null
    });
  }
}

module.exports = statModel