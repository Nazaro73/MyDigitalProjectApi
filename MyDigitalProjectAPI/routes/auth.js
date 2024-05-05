const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const User = require('../models/User');
/* Route de test */


router.post('/signup', async (req, res) => {
    const { email, password, display_name } = req.body;
    try {
      // Vérifier si l'e-mail existe déjà
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).send("Un utilisateur avec cet e-mail existe déjà.");
      }
  
      // Hasher le mot de passe et créer un nouvel utilisateur si l'e-mail n'est pas pris
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        display_name,
        password: hashedPassword
      });
      req.session.userId = newUser.id; // Connecter l'utilisateur après l'inscription
      res.status(201).send("Utilisateur créé et connecté !");
    } catch (error) {
      res.status(500).send("Erreur lors de la création de l'utilisateur : " + error.message);
    }
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (user && (await bcrypt.compare(password, user.password))) {
        req.session.userId = user.id; // Enregistrer l'utilisateur dans la session
        res.send("Connexion réussie !");
      } else {
        res.status(401).send("Email ou mot de passe incorrect");
      }
    } catch (error) {
      res.status(500).send("Erreur lors de la connexion");
    }
  });

  router.post('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send("Impossible de déconnecter");
      }
      res.clearCookie('connect.sid'); // Le nom du cookie ici est l'exemple par défaut
      res.send("Vous êtes déconnecté");
    });
  });






module.exports = router;