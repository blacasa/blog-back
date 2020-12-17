const queries = {
  allTypes: function () {
    return  `
SELECT
  id,
  code,
  libelle
FROM
  type
WHERE 1=1`
    },
    typeByGame: function () {
        return `
SELECT
  type.id,
  type.code,
  type.libelle
FROM
  type
  join jeu_type on type.id = jeu_type.id_type
WHERE 1=1
  and jeu_type.id_jeu = ?`
    }
}

module.exports = queries