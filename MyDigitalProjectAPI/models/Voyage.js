const { DataTypes } = require('sequelize');
const sequelize = require('./_database'); // Assurez-vous que ce chemin est correct

const Voyage = sequelize.define('Voyage', {
    id_voyage: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom_voyage: DataTypes.STRING,
    lieux: DataTypes.STRING,
    budget: DataTypes.DOUBLE,
    date_debut: DataTypes.DATE,
    date_fin: DataTypes.DATE,
    creator_id: DataTypes.INTEGER
});

module.exports = Voyage;