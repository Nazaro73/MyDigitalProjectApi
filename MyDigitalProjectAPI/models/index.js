const Sequelize = require('sequelize');
const sequelize = require('./_database');

// Import des modèles
const Voyage = require('./Voyage');
const VoyagePublic = require('./VoyagePublic');
const LikeVoyagePublic = require('./LikeVoyagePublic');
const User = require('./User');
const ParticipationUserVoyage = require('./ParticipationUserVoyage');
const Invitation = require('./Invitation');
const Activite = require('./Activite');
const ParticipationActiviteVoyage = require('./ParticipationActiviteVoyage');
const NoteActiviteVoyage = require('./NoteActiviteVoyage');
const NoteVoyage = require('./NoteVoyage');
const Photo = require('./Photo');
const Amis = require('./Amis');
const ListeSouhait = require('./ListeSouhait');
const Blog = require('./Blog');

// Définition des relations


// Relations pour Voyage
Voyage.hasMany(VoyagePublic, { foreignKey: 'id_voyage' });
Voyage.hasMany(LikeVoyagePublic, { foreignKey: 'id_voyage' });
Voyage.hasMany(ParticipationUserVoyage, { foreignKey: 'id_voyage' });
Voyage.hasMany(ParticipationActiviteVoyage, { foreignKey: 'id_voyage' });
Voyage.hasMany(NoteVoyage, { foreignKey: 'id_voyage' });
Voyage.hasMany(Photo, { foreignKey: 'id_voyage' });
Voyage.hasMany(ListeSouhait, { foreignKey: 'id_voyage' });

// Relations pour User
User.hasMany(LikeVoyagePublic, { foreignKey: 'id_user' });
User.hasMany(ParticipationUserVoyage, { foreignKey: 'id_user' });
User.hasMany(Invitation, { foreignKey: 'id_expediteur' });
User.hasMany(Invitation, { foreignKey: 'id_recepteur' });
User.hasMany(NoteActiviteVoyage, { foreignKey: 'id_user' });
User.hasMany(NoteVoyage, { foreignKey: 'id_user' });
User.hasMany(Amis, { foreignKey: 'id_user1' });
User.hasMany(Amis, { foreignKey: 'id_user2' });
User.hasMany(ListeSouhait, { foreignKey: 'id_user' });

// Relations pour Activite
Activite.hasMany(ParticipationActiviteVoyage, { foreignKey: 'id_activite' });
Activite.hasMany(NoteActiviteVoyage, { foreignKey: 'id_activite' });

// Sync all models with database
sequelize.sync({ force: false }).then(() => {
    console.log("Database & tables created!");
});

module.exports = {
    Sequelize,
    sequelize,
    Voyage,
    VoyagePublic,
    LikeVoyagePublic,
    User,
    ParticipationUserVoyage,
    Invitation,
    Activite,
    ParticipationActiviteVoyage,
    NoteActiviteVoyage,
    NoteVoyage,
    Photo,
    Amis,
    ListeSouhait,
    Blog
};
