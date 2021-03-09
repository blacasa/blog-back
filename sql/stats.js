const queries = {
  insertPageVisit: function () {
    return `INSERT INTO stats (datepage, page, data, country, region, city)
SELECT NOW(), ?, ?, ?, ?, ?`
  },
}

module.exports = queries