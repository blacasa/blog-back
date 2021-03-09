const mysql = require('mysql')
const config = require('./config')

// Source: https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
class Database {
  constructor(config) {
    // this.connection = mysql.createConnection(config);
    console.log('Database constructor')
    if (!this.connection) {
      console.log('Database - init connexion')
      this.connection = mysql.createPool(config);
    } else {
      console.log('Database - connexion déjà init')
    }
  }
  query(sql, attr) {
    // console.log('Database query')
    return new Promise((resolve, reject) => {
      this.connection.query( sql, attr, ( err, rows ) => {
        if (err) {
          console.log('Database - error', err)
          return reject(err);
        }
        // console.log('Database - query done')
        resolve( rows );
      } );
    } );
  }
  close() {
    return new Promise( ( resolve, reject ) => {
      this.connection.end( err => {
        if ( err ) {
          return reject(err);
        }
        resolve();
      } );
    } );
  }
}

const dbInstance = new Database(config.database)
module.exports = dbInstance;