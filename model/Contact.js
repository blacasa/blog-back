const db = require('../database')
const queries = require('../sql/contact')

const contactModel = {
  addMessage: function (data, sent) {
    let query = queries.addMessage()
    let params = [
      data.expediteur,
      data.message,
      sent,
      data.name
    ]

    return db.query(query, params).then( row => {
      return row.insertId !== 0 ? row.insertId : data.id
    });
  }
}

module.exports = contactModel