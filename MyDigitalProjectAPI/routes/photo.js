const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configuration de Multer pour le stockage des fichiers photos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Assurez-vous que ce dossier existe
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Prefixe le nom de fichier avec un timestamp
    }
});

const upload = multer({ storage: storage });

// Importation du modèle
const Photo = require('../models/Photo');

// POST pour télécharger une photo
router.post('/', upload.single('file'), async (req, res) => {
    try {
        const { id_voyage, legend } = req.body;
        const newPhoto = await Photo.create({
            path: req.file.path,
            date_heure: new Date(),
            legend: legend,
            id_voyage: id_voyage
        });
        res.status(201).json(newPhoto);
    } catch (error) {
        res.status(500).json({ message: "Error uploading photo", error: error.message });
    }
});

// GET pour récupérer toutes les photos d'un voyage
router.get('/:id_voyage', async (req, res) => {
    try {
        const photos = await Photo.findAll({
            where: { id_voyage: req.params.id_voyage }
        });
        res.json(photos);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving photos", error: error.message });
    }
});

// DELETE pour supprimer une photo
router.delete('/:id_photo', async (req, res) => {
    try {
        const deleted = await Photo.destroy({
            where: { id_photo: req.params.id_photo }
        });
        if (deleted) {
            res.json({ message: "Photo deleted" });
        } else {
            res.status(404).json({ message: "Photo not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting photo", error: error.message });
    }
});

module.exports = router;
