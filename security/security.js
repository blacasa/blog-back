const db = require('../database')
const bcrypt = require('bcrypt')

const security = {
  login: function (login, password) {
    const query = 'SELECT * FROM users WHERE email = \'' + login + '\'';

    return db.query(query).then(user => {      
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
      const query = 'INSERT INTO users (password, email, firstname, lastname) VALUES (\'' + hash + '\', \'' + login + '\', \'first\', \'last\')';
      
      return db.query(query).then(user => {
        return user
      });
    })
  }
}

module.exports = security