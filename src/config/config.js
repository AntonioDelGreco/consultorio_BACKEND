require('dotenv').config();

const corsOptions = {
  origin:[process.env.DOMINIO_FRONT],
  methods:"POST",
  credentials: true
  // origin: function(origin, callback){
  //   if (process.env.DOMINIO_FRONT.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   }
  //   else{
  //     callback(new Error('No permitido por CORS'));
  //   }
  // }
}

module.exports = corsOptions;
