const { Router } = require('express');
const router = Router();
const { crear } = require('../controllers/turnos.controller.js');

router.post('/turnos', crear)
module.exports = router;