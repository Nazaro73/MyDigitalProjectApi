const express = require('express');
const router = express.Router();
const User = require('../models/User');
const isAuthenticated = require('../middlewares/authMW');
/* Route de test */
router.get('/', isAuthenticated, async (req, res) => {
    try {
      // Récupérer l'utilisateur à partir de la base de données en utilisant l'ID stocké dans la session
      const user = await User.findByPk(req.session.userId);
  
      if (user) {
        // Renvoyer le message de bienvenue avec le nom de l'utilisateur
        res.send(`Bienvenue, ${user.display_name}!`);
      } else {
        res.status(404).send("Utilisateur non trouvé.");
      }
    } catch (error) {
      res.status(500).send("Erreur lors de la récupération de l'utilisateur : " + error.message);
    }
  });








module.exports = router;
