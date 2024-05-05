const express = require('express');
const router = express.Router();

// Importation des modèles
const Activite = require('../models/Activite');
const ParticipationActiviteVoyage = require('../models/ParticipationActiviteVoyage');

// POST pour créer une activité
router.post('/', async (req, res) => {
    try {
        const newActivite = await Activite.create(req.body);
        res.status(201).json(newActivite);
    } catch (error) {
        res.status(500).json({ message: "Error creating activity", error: error.message });
    }
});

// GET toutes les activités
router.get('/', async (req, res) => {
    try {
        const activites = await Activite.findAll();
        res.json(activites);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving activities", error: error.message });
    }
});

// GET une activité par ID
router.get('/:id', async (req, res) => {
    try {
        const activite = await Activite.findByPk(req.params.id);
        if (activite) {
            res.json(activite);
        } else {
            res.status(404).json({ message: "Activity not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving activity", error: error.message });
    }
});

// PUT pour mettre à jour une activité
router.put('/:id', async (req, res) => {
    try {
        const updated = await Activite.update(req.body, { where: { id_activite: req.params.id } });
        if (updated[0] > 0) {
            res.json({ message: "Activity updated" });
        } else {
            res.status(404).json({ message: "Activity not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating activity", error: error.message });
    }
});

// DELETE pour supprimer une activité
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Activite.destroy({ where: { id_activite: req.params.id } });
        if (deleted) {
            res.json({ message: "Activity deleted" });
        } else {
            res.status(404).json({ message: "Activity not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting activity", error: error.message });
    }
});

// GET les activités d'un voyage
router.get('/voyage/:id_voyage', async (req, res) => {
    try {
        const activities = await ParticipationActiviteVoyage.findAll({
            where: { id_voyage: req.params.id_voyage },
            include: [Activite]
        });
        res.json(activities.map(a => a.Activite));
    } catch (error) {
        res.status(500).json({ message: "Error fetching activities for voyage", error: error.message });
    }
});

module.exports = router;
