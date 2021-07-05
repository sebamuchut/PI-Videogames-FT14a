const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.send('probando /genre')
})

module.exports = router;