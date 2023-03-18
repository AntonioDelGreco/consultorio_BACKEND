import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import turnosRouter from './routes/turnos.router.js';
import contacto from './routes/contacto.router.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const dominiosPermitidos = [process.env.DOMINIO_FRONT];
const corsOptions = {
  origin: function(origin, callback){
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      callback(null, true);
    }
    else{
      callback(new Error('No permitido por CORS'));
    }
  }
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(corsOptions));
app.use('/', turnosRouter);
app.use('/', contacto);