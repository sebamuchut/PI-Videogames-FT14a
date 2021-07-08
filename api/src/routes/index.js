const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogame_router = require('./videogame_router')
const genres_router = require('./genres_router')
const post_videogame_router = require('./post_videogame_router')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogame_router);
router.use('/genres', genres_router);
router.use('/videogame', post_videogame_router);

module.exports = router;
