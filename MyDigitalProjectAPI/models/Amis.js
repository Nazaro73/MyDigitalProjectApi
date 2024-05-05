const { DataTypes } = require('sequelize');
const sequelize = require('./_database');

const Amis = sequelize.define('Amis', {
    id_amis: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_user1: { type: DataTypes.INTEGER },
    id_user2: { type: DataTypes.INTEGER }
});

module.exports = Amis;
