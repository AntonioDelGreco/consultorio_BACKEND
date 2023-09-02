const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const contactoRouter = require('./routes/contacto.router.js');
const turnosRouter = require('./routes/turnos.router.js');

dotenv.config()
const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const corsOptions = {
  origin: process.env.DOMINIO_FRONT,
  methods: 'POST',
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(corsOptions));
app.use('/', turnosRouter);
app.use('/', contactoRouter);