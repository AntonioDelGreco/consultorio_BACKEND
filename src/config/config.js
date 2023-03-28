const dotenv = require('dotenv')
dotenv.config();

const config = {
  //DB postgres
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  password2: process.env.DB_PASSWORD2,
  
  //url Cors frontend
  dominiosPermitidos:[process.env.DOMINIO_FRONT],
}

const corsOptions = {
  origin: function(origin, callback){
    if (config.dominiosPermitidos.indexOf(origin) !== -1) {
      callback(null, true);
    }
    else{
      callback(new Error('No permitido por CORS'));
    }
  }
}


module.exports = { config, corsOptions };
