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
  }
}

module.exports = queries