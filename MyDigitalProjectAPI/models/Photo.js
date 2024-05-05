const { DataTypes } = require('sequelize');
const sequelize = require('./_database');

const Photo = sequelize.define('Photo', {
    id_photo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    path: { type: DataTypes.STRING },
    date_heure: { type: DataTypes.DATE },
    legend: { type: DataTypes.STRING },
    id_voyage: { type: DataTypes.INTEGER }
});

module.exports = Photo;
