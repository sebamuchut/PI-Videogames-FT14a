const {Videogame, Genre} = require('../db')
const axios = require('axios')
const { YOUR_API_KEY, RAWG_URL_GAMES } = process.env;

function Get_All_Games (req, res, next) {
    if(req.query.name){ //if a name is passed by query, perform the search function provided by the API
        const name = req.query.name
        axios.get(`${RAWG_URL_GAMES}${YOUR_API_KEY}&search=${name}`)
            .then(response => {
                res.json(response.data.results)
            })
    } else {
        //else, get me 100 videogames
        console.log('getting games...')
        const all_games = axios.get(`${RAWG_URL_GAMES}${YOUR_API_KEY}`);
        const all_games_db = Videogame.findAll({include: {model:Genre}});
        Promise.all([all_games, all_games_db])
            // a 'promise's Hell' begins, beacuse I need 100, but API gives me 20 per call
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
                                })) //filter the data I need from the 100 games
                                
                                //modifying platforms and genres, cause I need them in a different way
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
                                        console.log('games obtained')
                                        return res.json(hundred_games)
                                        })
                                })
                            })
                    })
            })
            .catch((error) => next(error))
    }





}

function Videogame_detail (req, res, next) {
    //for asking details to API, I need to know the id
    if(req.params){
            const id = req.params.id_videogame
            if(id.length < 8){ //id in API have fewer characters
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
                //created games have id created with UUID
                console.log('searching id in database')
                Videogame.findByPk(id, {include: Genre}) //I also need to know the genres of that game. 
                                                        // Database tables should be linked VIDEOGAMES <---> GENRES
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