const { Genre } = require('../db')
const axios = require('axios')
const { YOUR_API_KEY, RAWG_URL_GENRES } = process.env;


// [ ] GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y 
// guardarlos en su propia base de datos y luego ya utilizarlos desde allí
let flag = false;
function Get_All_Genres (req, res, next) {
    axios.get(`${RAWG_URL_GENRES}${YOUR_API_KEY}`)
            .then(genres => {
                const genres_api = genres.data.results.map(el => ({id : el.id, name : el.name}))
                var arr = []
                genres_api.map(el => {arr.push(Genre.create(el))});
                Promise.all(arr)
                    .then(() => Genre.findAll()
                            .then(result => {return res.json(result)})
                            .catch(error => next(error)))
                
            })
            .catch(error => next(error))
    // if (flag === true){
    //     Genre.findAll()
    //         .then(result => {return res.json(result)})
    //         .catch(error => next(error))
    // }
    // if (flag === false) {
    //     axios.get(`${RAWG_URL_GENRES}${YOUR_API_KEY}`)
    //         .then(genres => {
    //             const genres_api = genres.data.results.map(el => ({id : el.id, name : el.name}))
    //             genres_api.map(el => {Genre.create(el)});
    //             console.log('Database loaded with genres')
    //             return res.send('upload page again')
    //         })
    //         .catch((error) => next(error))

    //     } 
    //         flag = true
}

module.exports = {
    Get_All_Genres
}
