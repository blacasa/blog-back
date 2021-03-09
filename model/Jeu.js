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
    // console.log('postJeu')
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
    // console.log('postJeu - Mode UPDATE')
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
    // console.log('unlinkJeuEditeur')
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
    // console.log('linkJeuEditeur', editeurIds)
    return new Promise((resolve, reject) => {
      editeurIds.forEach((editeurId, index) => {
        // console.log('foreach', editeurId)
        const query = queries.linkJeuEditeur()
        const params = [
          gameId,
          editeurId
        ]
        db.query(query, params).then(row => {
          // console.log('après query linkJeuEditeur', index, )
          if (index === editeurIds.length - 1) {
            // console.log('fin linkJeuEditeur')
            resolve(gameId);
          }
        }).catch(err => {
          reject(err)
        })
      })
    });
  },
  linkToEditeurs: function (gameId, editeurs) {
    // console.log('linkToEditeurs')
    const editeurIds = editeurs.split(',');

    return this.unlinkJeuEditeur(gameId).then(() => {
      return this.linkJeuEditeur(gameId, editeurIds).then( row => {
        //const insertedId = row.insertId
        return row.insertId
      });
    })
  },
  unlinkJeuPersonnalite: function (gameId) {
    // console.log('unlinkJeuPersonnalite')
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
    // console.log('linkJeuAuteur')
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
    // console.log('linkJeuIllustrateur')
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
    // console.log('linkToPersonnalites')
    const auteurIds = auteurs !== '' ? auteurs.split(',') : null;
    const illustrateurIds = illustrateurs !== '' ? illustrateurs.split(',') : null;

    return this.unlinkJeuPersonnalite(gameId).then(() => {
    // console.log('unlinkJeuPersonnalite.then')
      return this.linkJeuAuteur(gameId, auteurIds).then( row => {
    // console.log('linkJeuAuteur.then')
        //const insertedId = row.insertId
        return row ? row.insertId : gameId
      }).then(() => {
        return this.linkJeuIllustrateur(gameId, illustrateurIds).then(row => {
    // console.log('linkJeuIllustrateur.then')
          //const insertedId = row.insertId
          return row ? row.insertId : gameId
        })
      });
    })
  },
  linkJeuType: function (gameId, typeIds) {
    // console.log('linkJeuType', typeIds)
    return new Promise((resolve, reject) => {
      typeIds.forEach((typeId, index) => {
        // console.log('foreach', typeId)
        const query = queries.linkJeuType()
        const params = [
          gameId,
          typeId
        ]
        db.query(query, params).then(row => {
          // console.log('après query linkJeuType', index )
          if (index === typeIds.length - 1) {
            // console.log('fin linkJeuType')
            resolve(gameId);
          }
        }).catch(err => {
          reject(err)
        })
      })
    });
  },
  unlinkJeuType: function (gameId) {
    // console.log('unlinkJeuType')
    const deleteQuery = queries.unlinkJeuType()
    const deleteParams = [
      gameId
    ]
    return db.query(deleteQuery, deleteParams).then( row => {
      return gameId;
    }).catch(err => {
      reject(err)
    })
  },
  linkToType: function (gameId, types) {
    // console.log('linkToType')
    const typeIds = types.split(',');

    return this.unlinkJeuType(gameId).then(() => {
      return this.linkJeuType(gameId, typeIds).then( row => {
        //const insertedId = row.insertId
        return row.insertId
      });
    })
  }
}

module.exports = jeuModel