const express = require('express');
const router = express.Router();

// Importation du modèle
const Blog = require('../models/Blog');

// POST pour créer un blog
router.post('/', async (req, res) => {
    try {
        const { titre, contenu, date } = req.body;
        const newBlog = await Blog.create({
            titre,
            contenu,
            date: date || new Date()  // Utilisez la date actuelle si aucune n'est fournie
        });
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: "Error creating blog", error: error.message });
    }
});

// GET pour récupérer tous les blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving blogs", error: error.message });
    }
});

// GET pour récupérer un blog spécifique
router.get('/:id_blog', async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id_blog);
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving blog", error: error.message });
    }
});

// PUT pour mettre à jour un blog
router.put('/:id_blog', async (req, res) => {
    try {
        const { titre, contenu } = req.body;
        const updated = await Blog.update({ titre, contenu }, {
            where: { id_blog: req.params.id_blog }
        });
        if (updated[0] > 0) {
            res.json({ message: "Blog updated" });
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating blog", error: error.message });
    }
});

// DELETE pour supprimer un blog
router.delete('/:id_blog', async (req, res) => {
    try {
        const deleted = await Blog.destroy({
            where: { id_blog: req.params.id_blog }
        });
        if (deleted) {
            res.json({ message: "Blog deleted" });
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog", error: error.message });
    }
});

module.exports = router;
