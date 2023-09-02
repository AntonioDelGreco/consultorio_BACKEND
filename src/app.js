const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const contactoRouter = require('./routes/contacto.router.js');
const turnosRouter = require('./routes/turnos.router.js');

//configuraciones principales
dotenv.config()
const app = express();

//configuracion de CORS
const listaBlancaURl = [process.env.DOMINIO_FRONT]
const corsOptions = {
  origin: function (origin, callback) {
    if (listaBlancaURl.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('No permitido por CORS'))
    }
  }
}

//Levantando la app
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

//configuraciones 
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Rutas
app.use('/', turnosRouter);
app.use('/', contactoRouter);