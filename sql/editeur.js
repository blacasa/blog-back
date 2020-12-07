const queries = {
  allEditeurs: function () {
    return `
SELECT
  id,
  code,
  libelle
FROM
  editeur
WHERE 1=1`
  },
  editeurByGame: function () {
    return `
SELECT
  editeur.id,
  editeur.code,
  editeur.libelle
FROM
  editeur
  left join jeu_editeur on editeur.id = jeu_editeur.id_editeur
  left join jeu on jeu_editeur.id_jeu = jeu.id
WHERE 1=1
  and jeu.id = ?`
  },
  insertEditeur: function () {
    return `INSERT INTO editeur (code, libelle, datcre, datmaj, autcre, autmaj) SELECT ?, ?, NOW(), NOW(), ?, ?`
  }
}

module.exports = queries