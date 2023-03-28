const { Op } = require('sequelize');
const { models } = require('../libs/sequelize.js');


class TurnosManagers{
  constructor(){}

  async createTurno(data){
    const [ , created ] = await models.Turno.findOrCreate({
      where:{
        [Op.or]: [
          { nombre: data.nombre },
          { celular: data.celular },
          { fecha: data.fecha }
        ]
      },
      defaults:{
        nombre:data.nombre,
        celular:data.celular,
        obraSocial:data.obraSocial,
        fecha:data.fecha,
        horario:data.horario
      }
    });
    return [ , created ];
  }
}

module.exports = TurnosManagers;