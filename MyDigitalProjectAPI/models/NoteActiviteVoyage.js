const { DataTypes } = require('sequelize');
const sequelize = require('./_database');

const NoteActiviteVoyage = sequelize.define('NoteActiviteVoyage', {
    id_noteActiviteVoyage: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_activite: { type: DataTypes.INTEGER },
    id_user: { type: DataTypes.INTEGER },
    note: { type: DataTypes.INTEGER },
    commentaire: { type: DataTypes.TEXT }
});

module.exports = NoteActiviteVoyage;
