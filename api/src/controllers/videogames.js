const {Videogame} = require('../db')
const axios = require('axios')
const { YOUR_API_KEY } = process.env;
/*
[ ] GET /videogames:
Obtener un listado de los primeras 15 videojuegos
Debe devolver solo los datos necesarios para la ruta principal
[ ] GET /videogames?name="...":
Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
Si no existe ningún videojuego mostrar un mensaje adecuado
[ ] GET /videogame/{idVideogame}:
Obtener el detalle de un videojuego en particular
Debe traer solo los datos pedidos en la ruta de detalle de videojuego
Incluir los géneros asociados */

function Get_All_Games (req, res, next) {
    if(req.query.name){
        
    }

    return Videogame.findAll()
        .then((videogames) => res.json(videogames))
        .catch((error) => next(error))
}

module.exports = {
    Get_All_Games
}