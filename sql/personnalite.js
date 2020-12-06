const queries = {
  allPersonnalites: function () {
    return  `
SELECT
  id,
  nom,
  prenom
FROM
  personnalite
WHERE 1=1`
  },
  auteurByGame: function (gameId) {
    return `
SELECT
  personnalite.id,
  personnalite.nom,
  personnalite.prenom
FROM
  personnalite
  join jeu_personnalite on personnalite.id = jeu_personnalite.id_personnalite
  join role on jeu_personnalite.id_role = role.id
WHERE 1=1
  and role.code = 'AUTEUR'
  and jeu_personnalite.id_jeu = ` + gameId
  },
  illustrateurByGame: function (gameId) {
    return `
SELECT
  personnalite.id,
  personnalite.nom,
  personnalite.prenom
FROM
  personnalite
  join jeu_personnalite on personnalite.id = jeu_personnalite.id_personnalite
  join role on jeu_personnalite.id_role = role.id
WHERE 1=1
  and role.code = 'ILLUS'
  and jeu_personnalite.id_jeu = ` + gameId
  },
  insertPersonnalite: function () {
    return `INSERT INTO personnalite (nom, prenom) VALUES (?, ?)`
  }
}

module.exports = queries