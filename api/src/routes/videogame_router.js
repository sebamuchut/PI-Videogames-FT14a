const { Router } = require('express');
const { Get_All_Games, Videogame_detail } = require('../controllers/videogames')
const router = Router();
/*[ ] GET /videogames:
Obtener un listado de los primeras 15 videojuegos
Debe devolver solo los datos necesarios para la ruta principal
[ ] GET /videogames?name="...":
Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
Si no existe ningún videojuego mostrar un mensaje adecuado
[ ] GET /videogame/{idVideogame}:
Obtener el detalle de un videojuego en particular
Debe traer solo los datos pedidos en la ruta de detalle de videojuego
Incluir los géneros asociados */
router
    .get('/', Get_All_Games)
    .get('/:id_videogame', Videogame_detail)


module.exports = router;