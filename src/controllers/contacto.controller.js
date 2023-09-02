const enviarMail = require("../managers/email.managers.js");

const sendEmail = async (req, res) => {
  // variables
  const claves = [ 'nombre', 'celular', 'consulta' ];
  const validacionNombre = /^([A-Za-z]{1}[a-zñáéíóú]+[\s]*)+$/g;
  const validacionNumero = /^\d{10}$/g;
  const newMail = {};

  //recuperando datos
  const mailData = req.body;
  const datos = Object.values(mailData);
  try {
    //validaciones
    for (let i = 0; i < datos.length; i++) {
      const valorLimpio = datos[i].trim();
      if (!valorLimpio) {
        throw { message: 'Valores incompletos.', status: 400 };
      } else {
        newMail[claves[i]] = valorLimpio;
      }
    }
    if(!newMail.nombre.match(validacionNombre)) throw { message: 'El nombre no es válido.', status: 400 };
    if(!newMail.celular.match(validacionNumero)) throw { message: 'El celular no es válido.', status: 400 };

    const response = await enviarMail(newMail);
    if(response) throw { message: 'Su email falló en ser enviado. Por favor, intente de nuevo más tarde o intente por WhatsApp.', status: 409 }; 

    res.status(200).json({ success:true, message:'Su email se envió exitosamente' })
  } catch (error) {
    res.status(error.status || 500).json({ success: false, message: error.message })
  }
}

module.exports = { sendEmail };