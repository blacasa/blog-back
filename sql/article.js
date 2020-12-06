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
    return ` AND article.date_publication <= NOW()`
  },
  filterById: function (id) {
    return ` AND article.id = `  + id
  },
  limit: function (limit) {
    return ` LIMIT ` + limit
  },
  articleByGame: function (gameId) {
    return `
SELECT
  id,
  titre,
  date_publication as datePublication
FROM
  article
WHERE 1=1
  and id_jeu = ` + gameId
  },
  insertArticle: function () {
    return `INSERT INTO article (titre, contenu, date_publication, positif, negatif, id_jeu, image, datcre, datmaj)
SELECT ?, ?, ?, ?, ?, ?, ?, NOW(), NOW()`
  },
  updateArticle: function () {
    return `UPDATE article SET titre = ?, contenu = ?, date_publication = ?,
positif = ?, negatif = ?, id_jeu = ?, image = ?,
datmaj = NOW()
WHERE id = ?`
  }
}

module.exports = queries