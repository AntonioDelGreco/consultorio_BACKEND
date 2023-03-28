const { Sequelize } = require('sequelize');
const { config } = require('../config/config.js');
const setupModels = require('../db/models/index.js');

const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password || config.password2,
  {
    host:config.host,
    dialect:'postgresql'
  }
);

sequelize.sync();
setupModels(sequelize);

module.exports = sequelize;