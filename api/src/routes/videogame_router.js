const { Router } = require('express');
const { Get_Games } = require('../controllers/videogames')
const router = Router();

router.get('/', Get_Games)

module.exports = router;