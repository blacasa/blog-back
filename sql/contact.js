const queries = {
  addMessage: function () {
    return `INSERT INTO contacts (contact, message, sent, name, datcre)
SELECT ?, ?, ?, ?, NOW()`
  }
}

module.exports = queries