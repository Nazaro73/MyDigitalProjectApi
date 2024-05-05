const { DataTypes } = require('sequelize');
const sequelize = require('./_database');

const LikeVoyagePublic = sequelize.define('LikeVoyagePublic', {
    id_likeVoyagePublic: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_voyage: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER
});

module.exports = LikeVoyagePublic;