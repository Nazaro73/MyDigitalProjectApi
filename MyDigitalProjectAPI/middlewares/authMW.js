




// Ce fichier contient les middleware relatif à l'authentification
function isAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
      return next(); // L'utilisateur est connecté, passez au prochain middleware
    }
    // L'utilisateur n'est pas connecté, renvoyez une réponse d'erreur ou redirigez
    res.status(401).send("Vous devez être connecté pour accéder à cette ressource.");
  }

  module.exports = isAuthenticated;