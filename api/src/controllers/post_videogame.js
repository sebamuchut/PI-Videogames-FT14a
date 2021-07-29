const { Videogame, Genre } = require('../db')
const { v4: uuidv4 } = require('uuid');

/* POST /videogame:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
Crea un videojuego en la base de datos */

function Create_videogame (req, res, next) {
    const { name, description, released, rating, platforms, genre_body} = req.body
   
    console.log('genre_body: ', genre_body)

    var arr = []
    arr.push(Videogame.create({name, description, rating, released, platforms, id: uuidv4()}))
    genre_body.map(el => 
        arr.push(Genre.findOrCreate({where: {name: el}, defaults: {id: uuidv4()}}))
        )
   


    Promise.all(arr) //TypeError: values.map is not a function
        .then(response =>{
            console.log('entra al promise.all')
            const videogame = response.shift()
            var genres = response.map(el => el[0])
            videogame.addGenres(genres)
            res.json(videogame)
        })
        .catch(error => next(error))




    //
        


}

module.exports = {
    Create_videogame
}