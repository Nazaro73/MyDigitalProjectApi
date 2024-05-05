const express = require('express');
const router = express.Router();

// Importation des modèles
const NoteVoyage = require('../models/NoteVoyage');
const NoteActiviteVoyage = require('../models/NoteActiviteVoyage');

// Ajouter une évaluation pour un voyage
router.post('/voyages', async (req, res) => {
    try {
        const { id_voyage, id_user, note, commentaire } = req.body;
        const newNoteVoyage = await NoteVoyage.create({
            id_voyage,
            id_user,
            note,
            commentaire
        });
        res.status(201).json(newNoteVoyage);
    } catch (error) {
        res.status(500).json({ message: "Error adding voyage evaluation", error: error.message });
    }
});

// Récupérer toutes les évaluations d'un voyage
router.get('/voyages/:id_voyage', async (req, res) => {
    try {
        const { id_voyage } = req.params;
        const notes = await NoteVoyage.findAll({
            where: { id_voyage }
        });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving voyage evaluations", error: error.message });
    }
});

// Ajouter une évaluation pour une activité
router.post('/activites', async (req, res) => {
    try {
        const { id_activite, id_user, note, commentaire } = req.body;
        const newNoteActivite = await NoteActiviteVoyage.create({
            id_activite,
            id_user,
            note,
            commentaire
        });
        res.status(201).json(newNoteActivite);
    } catch (error) {
        res.status(500).json({ message: "Error adding activity evaluation", error: error.message });
    }
});

// Récupérer toutes les évaluations d'une activité
router.get('/activites/:id_activite', async (req, res) => {
    try {
        const { id_activite } = req.params;
        const notes = await NoteActiviteVoyage.findAll({
            where: { id_activite }
        });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving activity evaluations", error: error.message });
    }
});

module.exports = router;
