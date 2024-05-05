const { DataTypes } = require('sequelize');
const sequelize = require('./_database');

const ListeSouhait = sequelize.define('ListeSouhait', {
    id_souhait: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_user: { type: DataTypes.INTEGER },
    id_voyage: { type: DataTypes.INTEGER },
    Descriptif: { type: DataTypes.TEXT }
});

module.exports = ListeSouhait;
