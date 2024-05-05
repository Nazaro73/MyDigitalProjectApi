const express = require('express');
const router = express.Router();

// Importation des modèles Sequelize
const User = require('../models/User');
const ParticipationUserVoyage = require('../models/ParticipationUserVoyage');
const LikeVoyagePublic = require('../models/LikeVoyagePublic');

// GET tous les utilisateurs ou un utilisateur spécifique
router.get('/', async (req, res) => {
    try {
        const idUser = req.query.id_user;
        const users = idUser ? await User.findByPk(idUser) : await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

// GET utilisateurs par id_voyage
router.get('/voyage/:id_voyage', async (req, res) => {
    try {
        const { id_voyage } = req.params;
        const participants = await ParticipationUserVoyage.findAll({
            where: { id_voyage },
            include: [User]
        });
        res.json(participants.map(p => p.User));
    } catch (error) {
        res.status(500).json({ message: "Error fetching users for the voyage", error: error.message });
    }
});

// GET utilisateurs qui ont liké un voyage
router.get('/likes/:id_voyage', async (req, res) => {
    try {
        const { id_voyage } = req.params;
        const likers = await LikeVoyagePublic.findAll({
            where: { id_voyage },
            include: [User]
        });
        res.json(likers.map(l => l.User));
    } catch (error) {
        res.status(500).json({ message: "Error fetching users who liked the voyage", error: error.message });
    }
});

module.exports = router;
