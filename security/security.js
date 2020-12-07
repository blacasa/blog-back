const db = require('../database')
const bcrypt = require('bcrypt')

const security = {
  login: function (login, password) {
    const query = 'SELECT * FROM users WHERE email = ?';

    return db.query(query, [ login ]).then(user => {      
      return bcrypt.compare(password, user[0].password).then(userValidated => {
        if (userValidated) {
          console.log('Compte OK')
          return user[0]
        } else {
          console.log('Compte KO')
          return false
        }
      })
    });
  },
  register: function (login, password) {
    return bcrypt.hash(password, 10).then(hash => {
      const query = 'INSERT INTO users (password, email, firstname, lastname) VALUES (?, ?, \'first\', \'last\')';
      
      return db.query(query, [ hash, login ]).then(user => {
        return user
      });
    })
  }
}

module.exports = security