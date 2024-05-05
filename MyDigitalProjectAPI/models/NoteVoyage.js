const { DataTypes } = require('sequelize');
const sequelize = require('./_database');

const NoteVoyage = sequelize.define('NoteVoyage', {
    id_noteVoyage: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_voyage: { type: DataTypes.INTEGER },
    id_user: { type: DataTypes.INTEGER },
    note: { type: DataTypes.INTEGER },
    commentaire: { type: DataTypes.TEXT }
});

module.exports = NoteVoyage;
