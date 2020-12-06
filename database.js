const mysql = require('mysql')
const config = require('./config')

// Source: https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
class Database {
  constructor(config) {
    this.connection = mysql.createConnection( config );
  }
  query( sql, attr ) {
    return new Promise((resolve, reject) => {
      this.connection.query( sql, attr, ( err, rows ) => {
        if ( err ) {
          return reject(err);
        }
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