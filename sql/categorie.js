const queries = {
  getCategories: function () {
    return  `
SELECT
  categorie.id,
  categorie.code,
  categorie.libelle
FROM
  categorie
WHERE 1=1
  and categorie.actif = 1`
  }
}

module.exports = queries