const { Videogame, Genre } = require('../db')
const { v4: uuidv4 } = require('uuid');

/* POST /videogame:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
Crea un videojuego en la base de datos */

function Create_videogame (req, res, next) {
    const { name, description, released, rating, platforms, genre_body} = req.body
    Genre.findOrCreate({
        where: {name: genre_body},
        defaults: {id: uuidv4()}
    })
        .then(genre => {
            Videogame.create({name, description, rating, released, platforms, genre, id: uuidv4()})
                .then((game) =>{
                    console.log('A videogame has been created!')
                    res.json(game)
                })
                .catch(error => next(error))
        })
        .catch(error => next(error))


}

module.exports = {
    Create_videogame
}