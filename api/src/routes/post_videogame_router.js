const { Router } = require('express');
const { Create_videogame } = require('../controllers/post_videogame')
const router = Router();
/* POST /videogame:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
Crea un videojuego en la base de datos */
router
    .post('/', Create_videogame)


module.exports = router;