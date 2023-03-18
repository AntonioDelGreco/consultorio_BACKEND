import NodeMailer from 'nodemailer';

export class Formulario {

  constructor(nombre, celular, consulta){
    this.nombre = nombre;
    this.celular = celular;
    this.consulta = consulta;
  }
  
  validacion = () => {
    const validacionNombre = /^([A-Za-z]{1}[a-zñáéíóú]+[\s]*)+$/g;
    const validacionNumero = /^\d{10}$/g;
    return this.nombre.match(validacionNombre) && this.celular.match(validacionNumero);
  }

  sinEspacios = () => {
    const form = {
      name: this.nombre.trim(),
      cel: this.celular.trim(),
      question: this.consulta.trim(),
    }
    return form;
  }


  enviarMail = async () => {
    const config = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    }

    const transport = NodeMailer.createTransport(config);

    let mailOptions = {
      to: process.env.MAIL_USERNAME,
      subject: `Nombre: ${this.nombre}, cel: ${this.celular}`,
      text: this.consulta
    };

    //no funcional todavia
    return "";
    // await transport.sendMail(mailOptions, err => err ? `Error ${err}`: "");
  }
}