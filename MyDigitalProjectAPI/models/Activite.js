const { DataTypes } = require('sequelize');
const sequelize = require('./_database');

const Activite = sequelize.define('Activite', {
    id_activite: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom_activite: DataTypes.STRING,
    adresse_activite: DataTypes.STRING,
    prix_activite: DataTypes.DOUBLE
});

module.exports = Activite;
