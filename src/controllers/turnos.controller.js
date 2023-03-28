const TurnosManagers = require('../managers/turnos.managers.js');
const enviarMail = require('../managers/email.managers.js');
const manager = new TurnosManagers();

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
  
  try {
    //validaciones
    for (let i = 0; i < claves.length; i++) {
      const valorLimpio = datos[i].trim();
      if (!valorLimpio) {
        throw new Error('Valores incompletos.', { cause: 400 });
      } else {
        newTurno[claves[i]] = valorLimpio;
      }
    }
    if(!newTurno.nombre.match(validacionNombre)) {
      throw new Error(
        'El nombre no es válido.', 
        { cause: 400 }
      )
    }
    if(!newTurno.celular.match(validacionNumero)) {
      throw new Error(
        'El celular no es válido.', 
        { cause: 400 }
      )
    }

    const response = await manager.createTurno(newTurno);
    if(!response[1]) {
      throw new Error(
        'Ya existe un turno agendado para ese día o sus datos ya han sido registrados.', 
        { cause: 409 }
        )
      }
    const responseMail = await enviarMail(newTurno);
    if (responseMail) {
      throw new Error(
          'El turno no se fue concretado, comunicarse por WhatsApp.', 
          { cause: 409 }
        )
    }
    res.status(200).json({ success:true, message:'Su turno se registró correctamente, le escribiremos por celular a la brevedad.' })
  } catch (error) {
    res.status(error.cause).json({ success: false, message: error.message })
  }
}

module.exports = { crear }