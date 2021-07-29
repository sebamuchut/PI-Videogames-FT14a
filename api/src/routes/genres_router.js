const { Router } = require('express');
const { Get_All_Genres, Find_Genres } = require('../controllers/genres')
const router = Router();

//in '/genres' I have two functions --> '/genres/' and '/genres/find'
router
    .get('/', Get_All_Genres)
    .get('/find', Find_Genres)


module.exports = router;