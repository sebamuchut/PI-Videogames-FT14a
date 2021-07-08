const {Videogame, Genre} = require('../db')
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
    const all_games_db = Videogame.findAll({include: {model:Genre}});
    Promise.all([all_games, all_games_db])
        .then(videogames => {
            let [all_games, all_games_db] = videogames
            all_games_db = [...all_games_db, ...all_games.data.results]
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
                            
                            var hundred_games = all_games_db.map(el => ({
                                id: el.id, name: el.name, rating: el.rating, released: el.released, 
                                background_image: el.background_image, platforms: el.platforms, genres: el.genres 
                            }))
                            
                            //modifying platforms and genres
                            hundred_games.map(el => {
                                if(typeof el.platforms[0] === 'object') {
                                    if(el.platforms){
                                                    el.platforms = el.platforms.map(e => e.platform.name)
                                                }
                                                if(el.genres){
                                                    el.genres = el.genres.map(e => ({id: e.id, name: e.name}))
                                                }
                                            }
                                     })
                                        

                                        if(req.query.name){
                                            const name = req.query.name
                                            const filtered = hundred_games.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
                                            if(filtered.length === 0){
                                                return res.send('videogame not found')
                                            } else {
                                                return res.json(filtered.slice(0, 15))
                                            }
                                        }

                                        return res.json(hundred_games.slice(0, 15))
                                    })

                            })
                        })
                })
        })
        .catch((error) => next(error))



}

function Videogame_detail (req, res, next) {
    if(req.params){
            const id = req.params.id_videogame
            if(id.length < 8){
                console.log('searching id in API')
                axios.get(`${RAWG_URL_GAMES}/${id}${YOUR_API_KEY}`)
                    .then(game => {
                        const { id, name, background_image, genres, description, released, rating, platforms } = game.data
                        const platform = platforms.map(el => el.platform.name)
                        const genre = genres.map(el => ({id: el.id, name: el.name}))
                        const for_detail = {id, name, background_image, genre, description, released, rating, platform}
                        return res.json(for_detail)
                    })
                    .catch((error) => res.send('Error: Videogame not found'))
            }else {
                console.log('searching id in database')
                Videogame.findByPk(id)
                    .then(game =>{
                        return res.json(game.dataValues)
                    })
                    .catch(error => res.send('Error: Videogame not found'))
            }

        } 

}

module.exports = {
    Get_All_Games,
    Videogame_detail
}