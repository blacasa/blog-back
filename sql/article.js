const queries = {
  allArticles: function () {
    return  `
SELECT
  article.id,
  article.titre,
  article.contenu,
  article.date_publication as datePublication,
  article.positif,
  article.negatif,
  article.image,
  article.id_jeu as idJeu,
  article.code_url as codeUrl,
  GROUP_CONCAT(distinct categorie.code ORDER BY categorie.code SEPARATOR'|') as categories,
  COUNT(stats.id) as nbVues
FROM
  article
  LEFT JOIN article_categorie ON article.id = article_categorie.id_article
  LEFT JOIN categorie ON article_categorie.id_categorie = categorie.id and categorie.actif = 1
  LEFT JOIN stats ON SUBSTRING(page, 14) = article.code_url or SUBSTRING(page, 14) = article.id
WHERE 1=1`
  },
  allArticlesLigthContent: function () {
    return  `
SELECT
  article.id,
  article.titre,
  SUBSTRING(article.contenu, 1, 1000) as contenu,
  article.date_publication as datePublication,
  article.positif,
  article.negatif,
  article.id_jeu as idJeu,
  article.code_url as codeUrl,
  GROUP_CONCAT(distinct categorie.code ORDER BY categorie.code SEPARATOR'|') as categories,
  COUNT(stats.id) as nbVues
FROM
  article
  LEFT JOIN article_categorie ON article.id = article_categorie.id_article
  LEFT JOIN categorie ON article_categorie.id_categorie = categorie.id and categorie.actif = 1
  LEFT JOIN stats ON SUBSTRING(page, 14) = article.code_url or SUBSTRING(page, 14) = article.id
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
  groupByContact: function () {
    return ` GROUP BY article.id`
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
SELECT ?, ?, ?, ?, ?, ?, NULL, NOW(), NOW(), ?, ?`
  },
  updateArticle: function () {
    return `UPDATE article SET titre = ?, contenu = ?, date_publication = ?,
positif = ?, negatif = ?, id_jeu = ?, image = NULL,
datmaj = NOW(), autmaj = ?
WHERE id = ?`
  },
  unlinkArticleCategorie: function () {
    return `DELETE FROM article_categorie WHERE id_article = ?`
  },
  linkArticleCategorie: function () {
    return `INSERT INTO article_categorie (id_article, id_categorie)
VALUES (?, ?);`
  }
}

module.exports = queries