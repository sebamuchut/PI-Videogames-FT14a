const axios = require('axios')
const { YOUR_API_KEY, RAWG_URL_GENRES } = process.env;


// [ ] GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y 
// guardarlos en su propia base de datos y luego ya utilizarlos desde allí
function Get_All_Genres (req, res, next) {
    axios.get(`${RAWG_URL_GENRES}${YOUR_API_KEY}`)
        .then(genres => {
            console.log(genres.data.results.length)
            //aca tengo que ver de agregar los géneros a la db
            res.send('res funciona')
        })
        .catch((error) => next(error))
}

module.exports = {
    Get_All_Genres
}
