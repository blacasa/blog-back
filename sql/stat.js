const queries = {
  getStats: function () {
    return  `
SELECT page,
COUNT(id) as NbVues
FROM stats 
WHERE page LIKE '%/article/%' 
GROUP BY page
ORDER BY COUNT(id) DESC`
  },
  getViewStats: function () {
    return `
SELECT 
  article.code_url,
  article.id,
  COUNT(stats.id) as nbVues
FROM
  stats
  join article on SUBSTRING(page, 14) = article.code_url or SUBSTRING(page, 14) = article.id
WHERE page LIKE '%/article/%' 
GROUP BY article.code_url, article.id
ORDER BY COUNT(stats.id) DESC`
  },
  getViewStatsForArticle: function () {
    return `
SELECT 
  article.code_url,
  article.id,
  COUNT(stats.id) as nbVues
FROM
  stats
  join article on SUBSTRING(page, 14) = article.code_url or SUBSTRING(page, 14) = article.id
WHERE page LIKE '%/article/%'
AND (article.code_url = ? OR article.id = ?)
GROUP BY article.code_url, article.id
ORDER BY COUNT(stats.id) DESC`
  }
}

module.exports = queries