const enviarMail = require('../managers/email.managers.js');

const crear = async (req, res) => {
  //variables
  const claves = ['nombre', 'celular', 'obraSocial', 'fecha', 'horario'];
  const validacionNombre = /^([A-Za-z]{1}[a-zñáéíóú]+[\s]*)+$/g;
  const validacionNumero = /^\d{10}$/g;
  const newTurno = {};

  //recuperando datos
  let turnoData = req.body;
  if(!turnoData.obraSocial) turnoData.obraSocial = "ninguna";
  const datos =  Object.values(turnoData);
  console.log(datos)
  
  try {
    //validaciones
    for (let i = 0; i < claves.length; i++) {
      const valorLimpio = datos[i].trim();
      if (!valorLimpio) {
        throw { message: 'Valores incompletos.', status: 400 };
      } else {
        newTurno[claves[i]] = valorLimpio;
      }
    }
    if(!newTurno.nombre.match(validacionNombre)) throw { message: 'El nombre no es válido.', status: 400 };
    if(!newTurno.celular.match(validacionNumero)) throw { message: 'El celular no es válido.', status: 400 };

    const responseMail = await enviarMail(newTurno);
    if (responseMail) throw { message: 'El turno no se fue concretado, comunicarse por WhatsApp.', status: 409 };

    res.status(200).json({ success:true, message:'Su turno se registró correctamente, le escribiremos por celular a la brevedad.' })
  } catch (error) {
    res.status(error.status || 500).json({ success: false, message: error.message });
  }
}

module.exports = { crear }