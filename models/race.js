'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Race extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.RaceType)
    }
  }
  Race.init({
    name: DataTypes.STRING,
    RaceTypeId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'RaceTypes',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Race',
  });
  return Race;
};