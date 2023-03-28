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
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  }

  const transport = await nodemailer.createTransport(configMail);

  if('horario' in data){
    mailOptions = {
      to: process.env.MAIL_USERNAME,
      subject: `Nombre: ${data.nombre}, cel: ${data.celular}`,
      text: `Fecha del turno solicitado: ${data.fecha}.\nHora del turno solicitado: ${data.horario}.\nObra social disponible: ${data.obraSocial}`
    };
  } else{
    mailOptions = {
      to: process.env.MAIL_USERNAME,
      subject: `Nombre: ${data.nombre}, cel: ${data.celular}`,
      text: data.consulta
    };
  }

  // return true;
  await transport.sendMail(mailOptions, function(err) {
    if (err) {
      return true;
    } else {
      return false;
    }
  });
}

module.exports = enviarMail;