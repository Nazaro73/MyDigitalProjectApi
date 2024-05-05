const { DataTypes } = require('sequelize');
const sequelize = require('./_database');

const Invitation = sequelize.define('Invitation', {
    id_invitation: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_expediteur: DataTypes.INTEGER,
    id_recepteur: DataTypes.INTEGER
});

module.exports = Invitation;