const { Router } = require('express');
const { sendEmail } = require('../controllers/contacto.controller.js');
const router = Router();

router.post('contacto', sendEmail);

module.exports = router;
