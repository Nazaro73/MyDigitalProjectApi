const { DataTypes } = require('sequelize');
const sequelize = require('./_database');

const Blog = sequelize.define('Blog', {
    id_blog: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titre: { type: DataTypes.STRING },
    Contenu: { type: DataTypes.TEXT },
    date: { type: DataTypes.DATE }
});

module.exports = Blog;
