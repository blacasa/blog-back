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
  id_jeu as idJeu,
  code_url as codeUrl
FROM
  article
WHERE 1=1`
  },
  filterByPublished: function () {
    return ` AND article.date_publication <= NOW()`
  },
  filterById: function (id) {
    return ` AND (article.id = '`  + id +`' OR article.code_url = '` + id + `')`
  },
  limit: function (limit) {
    return ` LIMIT ` + limit
  },
  orderByPublishedDate: function () {
    return ` ORDER BY article.date_publication DESC`
  },
  countArticle: function () {
    return `SELECT COUNT(*) as nbPublishedArticles FROM article WHERE 1=1`
  },
  articleByGame: function () {
    return `
SELECT
  id,
  titre,
  date_publication as datePublication,
  code_url as codeUrl
FROM
  article
WHERE 1=1
  and id_jeu = ?`
  },
  insertArticle: function () {
    return `INSERT INTO article (titre, contenu, date_publication, positif, negatif, id_jeu, image, datcre, datmaj, autcre, autmaj)
SELECT ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?`
  },
  updateArticle: function () {
    return `UPDATE article SET titre = ?, contenu = ?, date_publication = ?,
positif = ?, negatif = ?, id_jeu = ?, image = ?,
datmaj = NOW(), autmaj = ?
WHERE id = ?`
  }
}

module.exports = queries