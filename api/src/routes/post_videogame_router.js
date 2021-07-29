const { Router } = require('express');
const { Create_videogame } = require('../controllers/post_videogame')
const router = Router();

//this route receives the values from front to create a videogame and store it in our database
router
    .post('/', Create_videogame)


module.exports = router;