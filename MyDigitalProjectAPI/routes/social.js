const express = require('express');
const router = express.Router();

// Importation des modèles
const Amis = require('../models/Amis');
const LikeVoyagePublic = require('../models/LikeVoyagePublic');

// Lister tous les amis d'un utilisateur
router.get('/amis/:id_user', async (req, res) => {
    try {
        const { id_user } = req.params;
        const friends = await Amis.findAll({
            where: { id_user1: id_user } // Assurez-vous de gérer les deux directions de l'amitié si nécessaire
        });
        res.json(friends);
    } catch (error) {
        res.status(500).json({ message: "Error fetching friends", error: error.message });
    }
});

// Ajouter un nouvel ami
router.post('/amis', async (req, res) => {
    try {
        const newFriend = await Amis.create(req.body);
        res.status(201).json(newFriend);
    } catch (error) {
        res.status(500).json({ message: "Error adding friend", error: error.message });
    }
});

// Supprimer un ami
router.delete('/amis/:id_amis', async (req, res) => {
    try {
        const { id_amis } = req.params;
        const deleted = await Amis.destroy({ where: { id_amis } });
        if (deleted) {
            res.json({ message: "Friendship deleted" });
        } else {
            res.status(404).json({ message: "Friendship not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting friendship", error: error.message });
    }
});

// Lister tous les likes d'un utilisateur
router.get('/likes/:id_user', async (req, res) => {
    try {
        const { id_user } = req.params;
        const likes = await LikeVoyagePublic.findAll({
            where: { id_user }
        });
        res.json(likes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching likes", error: error.message });
    }
});

// Ajouter un like sur un voyage
router.post('/likes', async (req, res) => {
    try {
        const newLike = await LikeVoyagePublic.create(req.body);
        res.status(201).json(newLike);
    } catch (error) {
        res.status(500).json({ message: "Error adding like", error: error.message });
    }
});

// Supprimer un like
router.delete('/likes/:id_likeVoyagePublic', async (req, res) => {
    try {
        const { id_likeVoyagePublic } = req.params;
        const deleted = await LikeVoyagePublic.destroy({ where: { id_likeVoyagePublic } });
        if (deleted) {
            res.json({ message: "Like deleted" });
        } else {
            res.status(404).json({ message: "Like not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting like", error: error.message });
    }
});

module.exports = router;
