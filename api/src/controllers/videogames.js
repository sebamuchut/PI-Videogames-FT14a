const {Videogame} = require('../db')

function Get_Games (req, res, next) {
    Videogame.findAll()
        .then((videogames) => res.json(videogames))
        .catch((error) => next(error))
}

module.exports = {
    Get_Games
}