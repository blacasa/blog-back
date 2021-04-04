const queries = {
  getStats: function () {
    return  `
SELECT page,
COUNT(id) as NbVues
FROM stats 
WHERE page LIKE '%/article/%' 
GROUP BY page
ORDER BY COUNT(id) DESC`
  }
}

module.exports = queries