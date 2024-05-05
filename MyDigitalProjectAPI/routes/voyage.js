const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/authMW');
// Importation des modèles
const bcrypt = require('bcrypt');
const Voyage = require('../models/Voyage');
const ParticipationActiviteVoyage = require('../models/ParticipationActiviteVoyage');
const ParticipationUserVoyage = require('../models/ParticipationUserVoyage');
const User = require('../models/User');

router.post('/',isAuthenticated, async (req, res) => {
    try {
        // Création d'un objet voyage avec les données de req.body
        const voyageData = {
            ...req.body,
            creator_id: req.session.userId // Ajout de l'identifiant de l'utilisateur à partir de la session
        };
        console.log(voyageData);
        // Création du nouveau voyage en base de données avec les données enrichies
        const newVoyage = await Voyage.create(voyageData);

        // Réponse réussie avec le nouveau voyage créé
        res.status(201).json(req.session.userId);
    } catch (error) {
        // Gestion des erreurs avec un code de statut 500 et un message d'erreur
        res.status(500).json({ message: "Error creating voyage", error: error.message });
    }
});



// GET un voyage par ID
router.get('/:id', async (req, res) => {
    try {
        const voyage = await Voyage.findByPk(req.params.id);
        if (voyage) {
            res.json(voyage);
        } else {
            res.status(404).json({ message: "Voyage not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving voyage", error: error.message });
    }
});

// PUT pour mettre à jour un voyage
router.put('/:id', async (req, res) => {
    try {
        const updated = await Voyage.update(req.body, { where: { id_voyage: req.params.id } });
        if (updated) {
            res.json({ message: "Voyage updated" });
        } else {
            res.status(404).json({ message: "Voyage not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating voyage", error: error.message });
    }
});

// DELETE pour supprimer un voyage
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Voyage.destroy({ where: { id_voyage: req.params.id } });
        if (deleted) {
            res.json({ message: "Voyage deleted" });
        } else {
            res.status(404).json({ message: "Voyage not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting voyage", error: error.message });
    }
});



// GET les voyages d'un utilisateur
router.get('/users/me/voyages', isAuthenticated, async (req, res) => {
  try {
      // La présence de l'ID utilisateur est garantie par le middleware 'isAuthenticated'
      const userVoyages = await ParticipationUserVoyage.findAll({
          where: { id_user: req.session.userId },  
          include: [Voyage]
      });

      // Mapper les résultats pour ne renvoyer que les données des voyages
      res.json(userVoyages.map(uv => uv.Voyage));
  } catch (error) {
      res.status(500).json({ message: "Error fetching voyages for user", error: error.message });
  }
});

router.get('/creator/me/voyages', isAuthenticated, async (req, res) => {
    try {
        // La présence de l'ID utilisateur est garantie par le middleware 'isAuthenticated'
        const userVoyages = await Voyage.findAll({
            where: { creator_id: req.session.userId },  
        });
  
        // Mapper les résultats pour ne renvoyer que les données des voyages
        res.json(userVoyages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching voyages for user", error: error.message });
    }
  });
  
///////////////////////////////////////////////////////////////////
// POST pour ajouter et supprimé une activité à un voyage
//////////////////////////////////////////////////////////////////


router.post('/:id_voyage/activites', async (req, res) => {
    try {
        const { id_activite } = req.body;
        const newParticipation = await ParticipationActiviteVoyage.create({
            id_voyage: req.params.id_voyage,
            id_activite
        });
        res.status(201).json(newParticipation);
    } catch (error) {
        res.status(500).json({ message: "Error adding activity to voyage", error: error.message });
    }
});

router.delete('/:id_voyage/activites/:id_activite', async (req, res) => {
  try {
      const { id_voyage, id_activite } = req.params;
      const result = await ParticipationActiviteVoyage.destroy({
          where: { id_voyage, id_activite }
      });
      if (result > 0) {
          res.json({ message: "Activity removed from voyage" });
      } else {
          res.status(404).json({ message: "Activity not found in voyage" });
      }
  } catch (error) {
      res.status(500).json({ message: "Error removing activity from voyage", error: error.message });
  }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
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
      console.log(error);
    }
  });

///////////////////////////////////////////////////////////
// POST pour ajouter et supprimer un utilisateur à un voyage
///////////////////////////////////////////////////////////


router.post('/:id_voyage/users', async (req, res) => {
    try {
        const { id_user } = req.body;
        const newUserParticipation = await ParticipationUserVoyage.create({
            id_voyage: req.params.id_voyage,
            id_user
        });
        res.status(201).json(newUserParticipation);
    } catch (error) {
        res.status(500).json({ message: "Error adding user to voyage", error: error.message });
    }
});

router.delete('/:id_voyage/users/:id_user', async (req, res) => {
  try {
      const { id_voyage, id_user } = req.params;
      const result = await ParticipationUserVoyage.destroy({
          where: { id_voyage, id_user }
      });
      if (result > 0) {
          res.json({ message: "User removed from voyage" });
      } else {
          res.status(404).json({ message: "User not found in voyage" });
      }
  } catch (error) {
      res.status(500).json({ message: "Error removing user from voyage", error: error.message });
  }
});

///////////////////////////////////////////////////////////
// Publier et Dépublier un voyage pour tout les user
///////////////////////////////////////////////////////////

// Ajouter un voyage partagé
router.post('/voyages-partages', async (req, res) => {
  try {
      const newVoyagePublic = await VoyagePublic.create(req.body);
      res.status(201).json(newVoyagePublic);
  } catch (error) {
      res.status(500).json({ message: "Error creating shared voyage", error: error.message });
  }
});

// Supprimer un voyage partagé
router.delete('/voyages-partages/:id_voyagePublic', async (req, res) => {
  try {
      const { id_voyagePublic } = req.params;
      const result = await VoyagePublic.destroy({
          where: { id_voyagePublic }
      });
      if (result > 0) {
          res.json({ message: "Shared voyage deleted" });
      } else {
          res.status(404).json({ message: "Shared voyage not found" });
      }
  } catch (error) {
      res.status(500).json({ message: "Error deleting shared voyage", error: error.message });
  }
});

module.exports = router;
