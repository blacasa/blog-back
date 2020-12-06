const db = require('../database')
const queries = require('../sql/jeu')
let session = require('../session')

const jeuModel = {
  getJeu: function (textSearch) {
    const gameSearch = typeof textSearch === 'undefined' ? '' : textSearch
    let query = queries.allJeux()
    query += queries.filterByNom(gameSearch)

    return db.query(query).then( rows => {
      return rows
    });
  },
  getJeuByArticle: function (articleId) {
    let query = queries.gameByArticle(articleId)

    return db.query(query, [articleId]).then( rows => {
      return rows
    });
  },
  postJeu: function (data) {
    let query = queries.insertJeu()
    let params = [
      data.nom,
      data.annee,
      data.jMin,
      data.jMax,
      data.dureeMin,
      data.dureeMax,
      data.dureePartie,
      data.envie,
      data.image,
      session.email
    ]
    // session.email est l'auteur de mise à jour
    // Si data.id est défini, on est en mode misr à jour
    if (typeof data.id !== 'undefined') {
      query = queries.updateJeu()
      params.push(data.id)
    } else {
      // Auteur de création
      params.push(session.email)
    }

    return db.query(query, params).then( row => {
      //const insertedId = row.insertId
      return row.insertId !== 0 ? row.insertId : data.id
    });
  },
  unlinkJeuEditeur: function (gameId) {
    const deleteQuery = queries.unlinkJeuEditeur()
    const deleteParams = [
      gameId
    ]
    return db.query(deleteQuery, deleteParams).then( row => {
      return gameId;
    }).catch(err => {
      reject(err)
    })
  },
  linkJeuEditeur: function (gameId, editeurIds) {
    return new Promise((resolve, reject) => {
      editeurIds.forEach((editeurId, index) => {
        const query = queries.linkJeuEditeur()
        const params = [
          gameId,
          editeurId
        ]
        db.query(query, params).then( row => {
          if (index === editeurId.length - 1) resolve(gameId);
        }).catch(err => {
          reject(err)
        })
      })
    });
  },
  linkToEditeurs: function (gameId, editeurs) {
    const editeurIds = editeurs.split(',');

    return this.unlinkJeuEditeur(gameId).then(() => {
      return this.linkJeuEditeur(gameId, editeurIds).then( row => {
        //const insertedId = row.insertId
        return row.insertId
      });
    })
  },
  unlinkJeuPersonnalite: function (gameId) {
    const deleteQuery = queries.unlinkJeuPersonnalite()
    const deleteParams = [
      gameId
    ]
    return db.query(deleteQuery, deleteParams).then( row => {
      return gameId;
    }).catch(err => {
      reject(err)
    })
  },
  linkJeuAuteur: function (gameId, auteurIds) {
    if (auteurIds === null) return new Promise((resolve, reject) => resolve())
    return new Promise((resolve, reject) => {
      auteurIds.forEach((auteurId, index) => {
        const query = queries.linkJeuAuteur()
        const params = [
          gameId,
          auteurId
        ]
        db.query(query, params).then( row => {
          if (index === auteurIds.length - 1) resolve(gameId);
        }).catch(err => {
          reject(err)
        })
      })
    });
  },
  linkJeuIllustrateur: function (gameId, illustrateurIds) {
    if (illustrateurIds === null) return new Promise((resolve, reject) => resolve())
    return new Promise((resolve, reject) => {
      illustrateurIds.forEach((illustrateurId, index) => {
        const query = queries.linkJeuIllustrateur()
        const params = [
          gameId,
          illustrateurId
        ]
        db.query(query, params).then( row => {
          if (index === illustrateurIds.length - 1) resolve(gameId);
        }).catch(err => {
          reject(err)
        })
      })
    });
  },
  linkToPersonnalites: function (gameId, auteurs, illustrateurs) {
    const auteurIds = auteurs !== '' ? auteurs.split(',') : null;
    const illustrateurIds = illustrateurs !== '' ? illustrateurs.split(',') : null;

    return this.unlinkJeuPersonnalite(gameId).then(() => {
      return this.linkJeuAuteur(gameId, auteurIds).then( row => {
        //const insertedId = row.insertId
        return row ? row.insertId : gameId
      }).then(() => {
        return this.linkJeuIllustrateur(gameId, illustrateurIds).then(row => {
          //const insertedId = row.insertId
          return row ? row.insertId : gameId
        })
      });
    })
  }
}

module.exports = jeuModel