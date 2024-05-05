const sequelize = require('./_database');
const {DataTypes}= require('sequelize');

const Role = sequelize.define('role', {
    // Définition des colonnes ici
    title:{
        type:DataTypes.STRING,
    },
})

module.exports = Role