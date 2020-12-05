const queries = {
  allArticles: function () {
    return  `
SELECT
  id,
  titre,
  contenu,
  date_publication as datePublication,
  positif,
  negatif,
  image,
  id_jeu as idJeu
FROM
  article
WHERE 1=1`
  },
  filterByPublished: function () {
    return ` AND date_publication <= NOW()`
  },
  limit: function (limit) {
    return ` LIMIT ` + limit
  }
}

module.exports = queries