const {Videogame} = require('../db')
const axios = require('axios')
const { YOUR_API_KEY, RAWG_URL_GAMES } = process.env;
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
    const all_games = axios.get(`${RAWG_URL_GAMES}${YOUR_API_KEY}`);
    const all_games_db = Videogame.findAll();
    const all_games_concat = []
    Promise.all([all_games, all_games_db])
        .then(videogames => {
            let [all_games, all_games_db] = videogames
            all_games_db = [...all_games_db, ...all_games.data.results]
            console.log(all_games_db.length)
            axios.get(all_games.data.next)
                .then(videogames2 => {
                    all_games_db = [...all_games_db, ...videogames2.data.results]
                    axios.get(videogames2.data.next)
                        .then(videogames3 =>{
                            all_games_db = [...all_games_db, ...videogames3.data.results]
                            axios.get(videogames3.data.next)
                            .then(videogames4 => {
                                all_games_db = [...all_games_db, ...videogames4.data.results]
                                axios.get(videogames4.data.next)
                                    .then(videogames5 => {
                                        all_games_db = [...all_games_db, ...videogames5.data.results]
                                        res.json(all_games_db.length)
                                    })

                            })
                        })
                })
        })



}

module.exports = {
    Get_All_Games
}