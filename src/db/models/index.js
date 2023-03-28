const { Turno, TurnoSchema } = require('./persona.model.js');

function setupModels(sequelize){
  Turno.init(TurnoSchema, Turno.config(sequelize));
}

module.exports = setupModels;