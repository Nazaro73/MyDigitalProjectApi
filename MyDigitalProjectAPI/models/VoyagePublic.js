const { DataTypes } = require('sequelize');
const sequelize = require('./_database');

const VoyagePublic = sequelize.define('VoyagePublic', {
    id_voyagePublic: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_voyage: DataTypes.INTEGER,
    descriptif: DataTypes.TEXT,
    tag: DataTypes.STRING
});

module.exports = VoyagePublic;