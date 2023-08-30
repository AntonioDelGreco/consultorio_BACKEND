const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config()

const enviarMail = async data => {
  let mailOptions;

  const configMail = {
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      password: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  }

  const transport = await nodemailer.createTransport(configMail);

  if('horario' in data){
    const fechaObj = new Date(data.fecha);
    const dia = fechaObj.getUTCDate();
    const mes = fechaObj.getUTCMonth() + 1;
    const anio = fechaObj.getUTCFullYear();

    mailOptions = {
      to: process.env.MAIL_USERNAME,
      subject: `Nombre: ${data.nombre}, cel: ${data.celular}`,
      text: `Fecha del turno solicitado: ${dia}/${mes}/${anio}.\nHora del turno solicitado: ${data.horario}.\nObra social disponible: ${data.obraSocial}`
    };
  } else{
    mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: process.env.MAIL_USERNAME,
      subject: `Nombre: ${data.nombre}, cel: ${data.celular}`,
      text: data.consulta
    };
  }
  // return true;
  // await transport.sendMail(mailOptions, function(err) {
  //   if (err) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });
}

module.exports = enviarMail;