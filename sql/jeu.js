const queries = {
  allJeux: function () {
    return  `
SELECT
  id,
  nom,
  annee,
  j_min as jMin,
  j_max as jMax,
  duree_min as dureeMin,
  duree_max as dureeMax,
  duree_partie as dureePartie,
  envie,
  image
FROM
  jeu
WHERE 1=1`
  },
  filterByNom: function (nom) {
    return ` AND nom LIKE '%` + nom + `%'`
  },
  gameByArticle: function () {
    return `
SELECT
  jeu.id,
  jeu.nom,
  jeu.annee,
  jeu.j_min as jMin,
  jeu.j_max as jMax,
  jeu.duree_min as dureeMin,
  jeu.duree_max as dureeMax,
  jeu.duree_partie as dureePartie,
  jeu.envie,
  jeu.image
FROM
  jeu
  join article on jeu.id = article.id_jeu
WHERE 1=1
  AND article.id = ?`
  },
  insertJeu: function () {
    return `INSERT INTO jeu (nom, annee, j_min, j_max, duree_min, duree_max, duree_partie, envie, image, datcre, datmaj, autcre, autmaj)
SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?`
  },
  updateJeu: function () {
    return `UPDATE jeu SET nom = ?, annee = ?, j_min = ?, j_max = ?,
duree_min = ?, duree_max = ?, duree_partie = ?, envie = ?, image = ?,
datmaj = NOW(), autmaj = ?
WHERE id = ?`
  },
  linkJeuEditeur: function () {
    return `INSERT INTO jeu_editeur (id_jeu, id_editeur)
VALUES (?, ?);`
  },
  unlinkJeuEditeur: function () {
    return `DELETE FROM jeu_editeur WHERE id_jeu = ?`
  },
  linkJeuAuteur: function () {
    return `INSERT INTO jeu_personnalite (id_jeu, id_personnalite, id_role)
SELECT ?, ?, role.id FROM role WHERE code = 'AUTEUR';`
  },
  linkJeuIllustrateur: function () {
    return `INSERT INTO jeu_personnalite (id_jeu, id_personnalite, id_role)
SELECT ?, ?, role.id FROM role WHERE code = 'ILLUS';`
  },
  unlinkJeuPersonnalite: function () {
    return `DELETE FROM jeu_personnalite WHERE id_jeu = ?`
  },
  unlinkJeuType: function () {
    return `DELETE FROM jeu_type WHERE id_jeu = ?`
  },
  linkJeuType: function () {
    return `INSERT INTO jeu_type (id_jeu, id_type)
VALUES (?, ?);`
  }
}

module.exports = queries