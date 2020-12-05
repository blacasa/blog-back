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
  }
}

module.exports = queries