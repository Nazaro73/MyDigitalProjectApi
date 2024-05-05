const { DataTypes } = require('sequelize');
const sequelize = require('./_database');

const ParticipationActiviteVoyage = sequelize.define('ParticipationActiviteVoyage', {
    id_participationActiviteVoyage: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_activite: DataTypes.INTEGER,
    id_voyage: DataTypes.INTEGER
});

module.exports = ParticipationActiviteVoyage;
