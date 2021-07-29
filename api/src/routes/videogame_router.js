const { Router } = require('express');
const { Get_All_Games, Videogame_detail } = require('../controllers/videogames')
const router = Router();

//in '/videogames' I have two functions --> '/videogames/' and one passing an id as param
router
    .get('/', Get_All_Games)
    .get('/:id_videogame', Videogame_detail)


module.exports = router;