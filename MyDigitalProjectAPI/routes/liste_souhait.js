const express = require('express');
const router = express.Router();

// Importation du modèle
const ListeSouhait = require('../models/ListeSouhait');

// POST pour ajouter un souhait
router.post('/', async (req, res) => {
    try {
        const { id_user, id_voyage, Descriptif } = req.body;
        const newSouhait = await ListeSouhait.create({
            id_user,
            id_voyage,
            Descriptif
        });
        res.status(201).json(newSouhait);
    } catch (error) {
        res.status(500).json({ message: "Error adding wish", error: error.message });
    }
});

// GET pour récupérer la liste de souhaits d'un utilisateur
router.get('/:id_user', async (req, res) => {
    try {
        const { id_user } = req.params;
        const souhaits = await ListeSouhait.findAll({
            where: { id_user }
        });
        res.json(souhaits);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving wishes", error: error.message });
    }
});

// PUT pour mettre à jour un souhait
router.put('/:id_souhait', async (req, res) => {
    try {
        const { id_souhait } = req.params;
        const updated = await ListeSouhait.update(req.body, {
            where: { id_souhait }
        });
        if (updated[0] > 0) {
            res.json({ message: "Wish updated" });
        } else {
            res.status(404).json({ message: "Wish not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating wish", error: error.message });
    }
});

// DELETE pour supprimer un souhait
router.delete('/:id_souhait', async (req, res) => {
    try {
        const { id_souhait } = req.params;
        const deleted = await ListeSouhait.destroy({
            where: { id_souhait }
        });
        if (deleted) {
            res.json({ message: "Wish deleted" });
        } else {
            res.status(404).json({ message: "Wish not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting wish", error: error.message });
    }
});

module.exports = router;
