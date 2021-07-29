const { Genre } = require('../db')
const axios = require('axios')
const { YOUR_API_KEY, RAWG_URL_GENRES } = process.env;

function Get_All_Genres (req, res, next) {
    axios.get(`${RAWG_URL_GENRES}${YOUR_API_KEY}`)
            .then(genres => {
                const genres_api = genres.data.results.map(el => ({id : el.id, name : [el.name]})) //This is definitely unnecesary, there must be changes to make
                var arr = []
                genres_api.map(el => {arr.push(Genre.create(el))});
                
                Promise.all(arr)
                    .then(() => Genre.findAll()
                            .then(result => {
                                return res.json(result)
                            })
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
function Find_Genres (req, res, next) {
    Genre.findAll().then(response => res.json(response)).catch(error => res.send('error finding genres in db'))
}

module.exports = {
    Get_All_Genres,
    Find_Genres
}
