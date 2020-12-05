const db = require('../database')
const queries = require('../sql/role')

const roleModel = {
  getRole: function () {
    let query = queries.allRoles()

    return db.query(query).then( rows => {
      return rows
    });
  }
}

module.exports = roleModel