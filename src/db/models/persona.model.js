const { Model, DataTypes } = require('sequelize');

const TURNOS_TABLA = 'turnos';

class Turno extends Model {

    static config(sequelize){
      return{
        sequelize,
        tableName:TURNOS_TABLA,
        modelName:'Turno',
        timestamps:false
      }
    }
}

const TurnoSchema = {
  id:{
    allowNull: false,
    autoIncrement:true,
    primaryKey:true,
    type: DataTypes.INTEGER
  },
  nombre: {
    allowNull:false,
    type:DataTypes.STRING,
    field:'nombre'
  },
  celular: {
    allowNull:false,
    type:DataTypes.STRING,
    field:'celular'
  },
  obraSocial:{
    allowNull:true,
    type:DataTypes.STRING,
    field:'obra social'
  },
  fecha:{
    allowNull:false,
    type:DataTypes.DATEONLY,
    field:'fecha'
  },
  horario:{
    allowNull:false,
    type:DataTypes.TIME,
    field:'horario'
  }
}
module.exports = { Turno, TurnoSchema };