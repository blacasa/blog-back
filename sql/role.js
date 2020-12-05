const queries = {
  allRoles: function () {
    return  `
SELECT
  id,
  code,
  libelle
FROM
  role
WHERE 1=1`
  }
}

module.exports = queries