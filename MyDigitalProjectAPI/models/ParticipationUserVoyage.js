const { DataTypes } = require('sequelize');
const sequelize = require('./_database');

const ParticipationUserVoyage = sequelize.define('ParticipationUserVoyage', {
    id_participationUserVoyage: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: DataTypes.INTEGER,
    id_voyage: DataTypes.INTEGER
});

module.exports = ParticipationUserVoyage;
