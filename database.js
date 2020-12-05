const mysql = require('mysql')

const config = {
    host: 'localhost',
    user: 'root',
    password: 'blacasa',
    database: '13blog'
}

/*
const database = mysql.createPool(config)

module.exports = database;
// */

class Database {
  constructor(config) {
    console.log('Database - constructor')
    this.connection = mysql.createConnection( config );
  }
  query( sql ) {
    return new Promise((resolve, reject) => {
      console.log('Database', sql)
      this.connection.query( sql, ( err, rows ) => {
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

//export default new Database(config)

const dbInstance = new Database(config)
module.exports = dbInstance;